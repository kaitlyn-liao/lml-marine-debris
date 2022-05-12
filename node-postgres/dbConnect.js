const Pool = require('pg').Pool
const pool = new Pool({
  user: 'lml_user',
  host: 'localhost',
  database: 'lml_database',
  password: 'wave',
  port: 5432,
});

module.exports = pool;