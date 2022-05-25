require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : process.env.LOCAL_DATABASE_URL,
});

module.exports = pool;
