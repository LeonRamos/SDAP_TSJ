// frontend/src/js/views/questionnaire.js

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

// --- Cuestionario GAD‑7 (frontend) ---
// Estructura basada en el instrumento original GAD‑7. [web:2][web:3]

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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const result = computeGAD7Score();
    if (!result) {
      alert('Por favor responde todas las preguntas antes de enviar.');
      return;
    }
    showResults(result);
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

function computeGAD7Score() {
  let total = 0;

  for (let i = 0; i < GAD7_QUESTIONS.length; i++) {
    const qName = `q${i + 1}`;
    const selected = document.querySelector(`input[name="${qName}"]:checked`);
    if (!selected) {
      return null;
    }
    total += Number(selected.value);
  }

  const level = gad7RiskLevel(total);
  return { total, level };
}

// Rangos estándar GAD‑7. [web:2][web:5]
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

  // Desplazar hacia resultados
  section.scrollIntoView({ behavior: 'smooth' });
}

// --- Solicitud de apoyo (por ahora sin backend) ---

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
    alert('Tu solicitud ha sido registrada en esta versión piloto. En la versión final se enviará al área de psicología del TSJ.');
    form.reset();
  });
}
