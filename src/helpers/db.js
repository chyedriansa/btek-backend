const {Pool} = require("pg");

const db = new Pool({
  connectionString : "postgresql://postgres:chyedriansa5@localhost:5432/postgres?schema=public"
});

module.exports = db;