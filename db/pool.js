const { Pool } = require('pg')

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || 'postgres://localhost:5432/bcryptJwtCookies',
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
})

module.exports = pool
