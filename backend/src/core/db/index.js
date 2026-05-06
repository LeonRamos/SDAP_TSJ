// backend/src/core/db/index.js

const { Pool } = require('pg');

const connectionString =
  process.env.DATABASE_URL || 'postgres://tsj_user:tsj_pass@db:5432/tsj_mental_health';

const pool = new Pool({
  connectionString
});

function query(text, params) {
  return pool.query(text, params);
}

module.exports = { query, pool };