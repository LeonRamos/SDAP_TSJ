// backend/src/core/db/index.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://tsj_user:tsj_pass@localhost:5432/tsj_mental_health'
});

function query(text, params) {
  return pool.query(text, params);
}

module.exports = { query, pool };
