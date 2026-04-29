// frontend/src/js/views/questionnaire.js

const API_BASE_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  protectRouteForStudent();
  setupLogout();
  initQuestionnaire();
  setupSupportForm();
});

// --- Protección de ruta ---

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
    window.location.href = './psych-dashboard.html';
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

function getCurrentUserId() {
  const userRaw = localStorage.getItem('currentUser');
  if (!userRaw) return null;
  try {
    const user = JSON.parse(userRaw);
    return user.id || null;
  } catch {
    return null;
  }
}

// --- Cuestionario GAD‑7 (frontend) ---

const GAD7_QUESTIONS = [
  'Sentirte nervioso/a, ansioso/a o al borde.',
  'No poder parar o controlar la preocupación.',
  'Preocuparte demasiado por diferentes cosas.',
  'Tener dificultad para relajarte.',
  'Estar tan inquieto/a que te resulta difícil permanecer sentado/a.',
  'Molestarte o irritarte fácilmente.',
  'Sentir miedo como si algo terrible pudiera pasar.'
];

const GAD7_OPTIONS = [
  { value: 0, label: 'Nada' },
  { value: 1, label: 'Varios días' },
  { value: 2, label: 'Más de la mitad de los días' },
  { value: 3, label: 'Casi todos los días' }
];

function initQuestionnaire() {
  const select = document.getElementById('questionnaireSelect');
  const form = document.getElementById('questionnaireForm');

  if (!select || !form) return;

  // Por ahora solo GAD‑7
  renderGAD7Questions();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const answers = collectGad7Answers();
    if (!answers) {
      alert('Por favor responde todas las preguntas antes de enviar.');
      return;
    }

    const userId = getCurrentUserId();
    if (!userId) {
      alert('No se encontró tu sesión. Vuelve a iniciar sesión.');
      window.location.href = './login.html';
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/questionnaires/gad7/responses`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, answers })
        }
      );

      if (!response.ok) {
        const errBody = await safeJson(response);
        const message =
          errBody?.message || 'No fue posible guardar tu respuesta.';
        alert(message);
        return;
      }

      const data = await response.json();
      showResults({ total: data.totalScore, level: data.riskLevel });
    } catch (err) {
      console.error('Error al enviar respuestas GAD-7:', err);
      alert('Ocurrió un error al enviar tus respuestas. Intenta de nuevo.');
    }
  });
}

function renderGAD7Questions() {
  const container = document.getElementById('questionsContainer');
  const intro = document.getElementById('questionnaireIntro');
  if (!container) return;

  container.innerHTML = '';

  if (intro) {
    intro.textContent =
      'Durante las últimas dos semanas, ¿con qué frecuencia te han afectado los siguientes problemas?';
  }

  GAD7_QUESTIONS.forEach((text, index) => {
    const qId = `q${index + 1}`;
    const field = document.createElement('div');
    field.className = 'form-field';

    const label = document.createElement('span');
    label.textContent = `${index + 1}. ${text}`;

    const optionsWrapper = document.createElement('div');
    optionsWrapper.style.display = 'flex';
    optionsWrapper.style.flexWrap = 'wrap';
    optionsWrapper.style.gap = '0.5rem';
    optionsWrapper.style.marginTop = '0.25rem';

    GAD7_OPTIONS.forEach((opt) => {
      const optLabel = document.createElement('label');
      optLabel.style.display = 'inline-flex';
      optLabel.style.alignItems = 'center';
      optLabel.style.gap = '0.25rem';
      optLabel.style.fontSize = '0.85rem';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = qId;
      radio.value = String(opt.value);
      radio.required = true;

      optLabel.appendChild(radio);
      optLabel.appendChild(document.createTextNode(opt.label));
      optionsWrapper.appendChild(optLabel);
    });

    field.appendChild(label);
    field.appendChild(optionsWrapper);
    container.appendChild(field);
  });
}

// ahora solo recolecta respuestas; el cálculo lo hace el backend
function collectGad7Answers() {
  const answers = [];

  for (let i = 0; i < GAD7_QUESTIONS.length; i++) {
    const qName = `q${i + 1}`;
    const selected = document.querySelector(`input[name="${qName}"]:checked`);
    if (!selected) {
      return null;
    }
    answers.push(Number(selected.value));
  }

  return answers;
}

// ya no se usa computeGAD7Score, lo puedes borrar o dejar sin usar

function gad7RiskLevel(score) {
  if (score <= 4) return 'Mínimo';
  if (score <= 9) return 'Leve';
  if (score <= 14) return 'Moderado';
  return 'Severo';
}

function showResults({ total, level }) {
  const section = document.getElementById('resultsSection');
  const summary = document.getElementById('resultsSummary');

  if (!section || !summary) return;

  summary.textContent =
    `Tu puntaje total en el GAD‑7 es ${total} puntos, lo que se ubica en el rango de ansiedad ${level.toLowerCase()}. ` +
    'Te recomendamos comentar estos resultados con un profesional de la salud mental si te generan preocupación.';

  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth' });
}

// Solicitud de apoyo (mock)
function setupSupportForm() {
  const form = document.getElementById('supportForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    if (!formData.get('consent')) {
      alert('Debes aceptar el consentimiento para enviar la solicitud.');
      return;
    }

    const payload = {
      contactEmail: formData.get('contactEmail'),
      comment: formData.get('comment') || ''
    };

    console.log('Support request payload (mock):', payload);
    alert(
      'Tu solicitud ha sido registrada en esta versión piloto. En la versión final se enviará al área de psicología del TSJ.'
    );
    form.reset();
  });
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

