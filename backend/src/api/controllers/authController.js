// backend/src/api/controllers/authController.js

// OJO: esto es temporal para el POC. Luego lo cambiamos a BD + hash.

const demoUsers = [
  {
    id: 1,
    username: 'demo.estudiante@tsj.edu.mx',
    email: 'demo.estudiante@tsj.edu.mx',
    password: '123456',
    role: 'student'
  },
  {
    id: 2,
    username: 'demo.psico@tsj.edu.mx',
    email: 'demo.psico@tsj.edu.mx',
    password: '123456',
    role: 'psychologist'
  }
];

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
  }

  const foundUser = demoUsers.find(
    u => (u.username === username || u.email === username) && u.password === password
  );

  if (!foundUser) {
    return res.status(401).json({ message: 'Credenciales no válidas.' });
  }

  const token = 'demo-token-tsj';

  res.json({
    token,
    user: {
      id: foundUser.id,
      role: foundUser.role,
      email: foundUser.email
    }
  });
}

async function register(req, res) {
  const { displayName, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
  }

  const existing = demoUsers.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ message: 'Este correo ya está registrado (demo).' });
  }

  const newUser = {
    id: demoUsers.length + 1,
    username: email,
    email,
    password,
    role: 'student',
    displayName: displayName || null
  };

  demoUsers.push(newUser);

  res.status(201).json({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role
  });
}

module.exports = { login, register };