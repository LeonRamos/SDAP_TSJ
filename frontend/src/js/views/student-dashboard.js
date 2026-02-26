// frontend/src/js/views/student-dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  protectRouteForStudent();
  setupLogout();
  fillStudentInfo();
  loadMockHistory();
});

function protectRouteForStudent() {
  const userRaw = localStorage.getItem('currentUser');
  if (!userRaw) {
    window.location.href = './login.html';
    return;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch {
    window.location.href = './login.html';
    return;
  }

  if (user.role !== 'student') {
    // Si es psicólogo, lo mandamos a su panel
    window.location.href = './psych-dashboard.html';
    return;
  }
}

function setupLogout() {
  const logoutLink = document.getElementById('logoutLink');
  if (!logoutLink) return;

  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    window.location.href = './login.html';
  });
}

function fillStudentInfo() {
  const subtitleEl = document.getElementById('studentSubtitle');
  if (!subtitleEl) return;

  const userRaw = localStorage.getItem('currentUser');
  if (!userRaw) {
    subtitleEl.textContent = 'No se encontró información de usuario.';
    return;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch {
    subtitleEl.textContent = 'No se encontró información de usuario.';
    return;
  }

  const email = user.email || 'cuenta institucional';
  subtitleEl.textContent = `Has ingresado al sistema con la cuenta ${email}. Desde aquí puedes responder los cuestionarios del proyecto piloto y, si lo deseas, solicitar apoyo psicológico.`;
}

// De momento mostramos un historial simulado
function loadMockHistory() {
  const tbody = document.getElementById('historyBody');
  if (!tbody) return;

  const mockHistory = [
    {
      date: '2026-02-20',
      questionnaire: 'GAD‑7',
      score: 6,
      level: 'Leve'
    },
    {
      date: '2026-02-22',
      questionnaire: 'PHQ‑9',
      score: 9,
      level: 'Moderado'
    }
  ];

  if (!mockHistory.length) {
    tbody.innerHTML = `
      <tr><td colspan="4" class="table-empty">Todavía no has realizado autoevaluaciones.</td></tr>
    `;
    return;
  }

  tbody.innerHTML = '';
  mockHistory.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.date}</td>
      <td>${item.questionnaire}</td>
      <td>${item.score}</td>
      <td>${item.level}</td>
    `;
    tbody.appendChild(tr);
  });
}
