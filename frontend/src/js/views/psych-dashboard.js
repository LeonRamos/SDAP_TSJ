// frontend/src/js/views/psych-dashboard.js

const API_BASE_URL = 'http://localhost:3000'; // luego lo usaremos

document.addEventListener('DOMContentLoaded', () => {
  protectRouteForPsychologist();
  setupLogout();
  loadMockRiskSummary();
  loadMockSupportRequests();
});

function protectRouteForPsychologist() {
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

  if (user.role !== 'psychologist') {
    window.location.href = './student-dashboard.html';
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

// De momento: datos simulados. Luego se cambia por fetch a /reports/risk-summary
function loadMockRiskSummary() {
  const gad7 = document.getElementById('gad7Summary');
  const phq9 = document.getElementById('phq9Summary');
  const bellq = document.getElementById('bellqSummary');

  if (gad7) {
    gad7.textContent =
      'Total de 42 autoevaluaciones. 18% en riesgo moderado y 7% en riesgo severo de ansiedad (valores simulados).';
  }
  if (phq9) {
    phq9.textContent =
      'Total de 40 autoevaluaciones. 15% en riesgo moderado y 5% en riesgo severo de síntomas depresivos (valores simulados).';
  }
  if (bellq) {
    bellq.textContent =
      'Total de 39 autoevaluaciones. 20% con dificultades relevantes en adaptación psicosocial (valores simulados).';
  }
}

// También simulamos la tabla de solicitudes por ahora
function loadMockSupportRequests() {
  const tbody = document.getElementById('supportRequestsBody');
  if (!tbody) return;

  const mock = [
    {
      id: 1,
      displayName: 'Estudiante A',
      email: 'estudiante.a@tsj.edu.mx',
      createdAt: '2026-02-20',
      status: 'pending'
    },
    {
      id: 2,
      displayName: 'Estudiante B',
      email: 'estudiante.b@tsj.edu.mx',
      createdAt: '2026-02-22',
      status: 'pending'
    }
  ];

  if (!mock.length) {
    tbody.innerHTML = `
      <tr><td colspan="6" class="table-empty">No hay solicitudes pendientes.</td></tr>
    `;
    return;
  }

  tbody.innerHTML = '';
  mock.forEach((item) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.displayName}</td>
      <td>${item.email}</td>
      <td>${item.createdAt}</td>
      <td>
        <span class="badge ${item.status === 'pending' ? 'badge-pending' : 'badge-closed'}">
          ${item.status === 'pending' ? 'Pendiente' : 'Atendido'}
        </span>
      </td>
      <td>
        <button class="btn-table" data-id="${item.id}">
          Marcar como atendido
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('button.btn-table');
    if (!btn) return;

    const id = btn.getAttribute('data-id');
    alert(`En la versión real se marcará como atendida la solicitud #${id}.`);
    // Aquí luego enviaremos un PATCH /support-requests/:id con status=closed
  });
}
