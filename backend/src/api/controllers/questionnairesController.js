const { query } = require('../../core/db');

// POR AHORA: el userId vendrá en el body, luego lo sacamos del token
async function saveGad7Response(req, res) {
  const { userId, answers } = req.body;

  if (!userId || !Array.isArray(answers) || answers.length !== 7) {
    return res.status(400).json({
      message:
        'Se requieren userId y un arreglo de 7 respuestas numéricas para GAD-7.'
    });
  }

  // Validar que todas sean números 0–3
  const scores = answers.map(Number);
  if (scores.some((v) => Number.isNaN(v) || v < 0 || v > 3)) {
    return res.status(400).json({
      message: 'Las respuestas deben ser valores numéricos entre 0 y 3.'
    });
  }

  const totalScore = scores.reduce((acc, v) => acc + v, 0);
  const riskLevel = gad7RiskLevel(totalScore);

  try {
    await query(
      `INSERT INTO questionnaire_responses
       (user_id, questionnaire_code, total_score, risk_level)
       VALUES ($1, $2, $3, $4)`,
      [userId, 'GAD7', totalScore, riskLevel]
    );

    res.status(201).json({
      totalScore,
      riskLevel
    });
  } catch (err) {
    console.error('Error al guardar respuesta GAD-7:', err);
    res.status(500).json({ message: 'Error interno al guardar la respuesta.' });
  }
}

function gad7RiskLevel(score) {
  if (score <= 4) return 'Minimo';
  if (score <= 9) return 'Leve';
  if (score <= 14) return 'Moderado';
  return 'Severo';
}

module.exports = { saveGad7Response };
