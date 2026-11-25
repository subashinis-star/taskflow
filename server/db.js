
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),

  // SSL is required for Render's external database connection.
  ssl: process.env.DB_HOST?.includes("render.com")
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;
