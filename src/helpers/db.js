const {Pool} = require("pg");

const db = new Pool({
  connectionString : "postgresql://postgres:chyedriansa5@db.vydylhtkymrtwcqqrrwb.supabase.co:5432/postgres?schema=public"
});

module.exports = db;