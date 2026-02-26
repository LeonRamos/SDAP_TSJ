// frontend/src/js/views/login.js

const API_BASE_URL = 'http://localhost:3000'; // ajusta si cambias el puerto del backend

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegisterSubmit);
  }
});

async function handleLoginSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const payload = {
    username: formData.get('username'),
    password: formData.get('password')
  };

  // TODO: reemplazar console.log por llamada real a la API
  console.log('Login payload:', payload);

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await safeJson(response);
      const message = errorBody?.message || 'No fue posible iniciar sesión.';
      alert(message);
      return;
    }

    const data = await response.json();

    // Se asume que el backend devuelve { token, user: { role, ... } }
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user || {}));

      // Redirección según rol
      if (data.user?.role === 'psychologist') {
        window.location.href = './psych-dashboard.html';
      } else {
        window.location.href = './student-dashboard.html';
      }
    } else {
      alert('Respuesta de servidor inesperada. Intenta de nuevo más tarde.');
    }
  } catch (err) {
    console.error('Error en login:', err);
    alert('Ocurrió un error al iniciar sesión. Verifica tu conexión.');
  }
}

async function handleRegisterSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const password = formData.get('password');
  const passwordConfirm = formData.get('passwordConfirm');

  if (password !== passwordConfirm) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  if (!formData.get('terms')) {
    alert('Debes aceptar el uso confidencial de tus datos para continuar.');
    return;
  }

  const payload = {
    displayName: formData.get('displayName') || null,
    email: formData.get('email'),
    password
  };

  console.log('Register payload:', payload);

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await safeJson(response);
      const message = errorBody?.message || 'No fue posible completar el registro.';
      alert(message);
      return;
    }

    const data = await response.json();

    alert('Registro exitoso. Ahora puedes iniciar sesión con tus credenciales.');
    // Opcional: autologin o redirigir directamente al login
    window.location.hash = '#ingreso';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('Error en registro:', err);
    alert('Ocurrió un error al registrarte. Verifica tu conexión.');
  }
}

// Utilidad para intentar parsear JSON sin romper la app
async function safeJson(response) {
  try {
    return await response.json();
  } catch (_) {
    return null;
  }
}
