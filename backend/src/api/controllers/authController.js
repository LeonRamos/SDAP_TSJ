// backend/src/api/controllers/authController.js
const { query } = require('../../core/db');

// LOGIN
async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Usuario y contraseña son requeridos.' });
  }

  try {
    const result = await query(
      'SELECT id, email, password, role, display_name FROM users WHERE email = $1',
      [username]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Credenciales no válidas.' });
    }

    const user = result.rows[0];

    // POR AHORA: comparación en texto plano (luego se cambia a bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Credenciales no válidas.' });
    }

    // Token “dummy” para el POC
    const token = 'demo-token-tsj';

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        displayName: user.display_name
      }
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error interno al iniciar sesión.' });
  }
}

// REGISTER
async function register(req, res) {
  const { displayName, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Correo y contraseña son requeridos.' });
  }

  try {
    // Verificar si ya existe
    const existing = await query('SELECT id FROM users WHERE email = $1', [
      email
    ]);

    if (existing.rowCount > 0) {
      return res
        .status(409)
        .json({ message: 'Este correo ya está registrado.' });
    }

    const insert = await query(
      `INSERT INTO users (email, password, role, display_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, role, display_name`,
      [email, password, 'student', displayName || null]
    );

    const user = insert.rows[0];

    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      displayName: user.display_name
    });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ message: 'Error interno al registrar usuario.' });
  }
}

module.exports = { login, register };
