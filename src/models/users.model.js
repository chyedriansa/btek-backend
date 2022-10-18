const db = require ("../helpers/db");

const table = "users";

exports.insertUser = (data) => {
  const sql = `INSERT INTO ${table} ("email", "password") VALUES ($1, $2) RETURNING *`;
  const params = [data.email, data.password];
  return db.query(sql, params);
};

exports.selectAllUsers = () => {
  const sql = `SELECT * FROM "${table}"`;
  return db.query(sql);
};

exports.selectUserById = (id) => {
  const sql = `SELECT * FROM "${table}" WHERE id=$1`;
  const params = [id];
  return db.query(sql, params);
};

exports.updateUserById = (id, email, password) => {
  const sql = `UPDATE ${table} SET id = $1 email = $2, password = $3 WHERE RETURNING *`;
  const params = [id, email, password];
  return db.query(sql, params);
};

exports.deleteUserById = (data) => {
  const sql = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
  const params = [data];
  return db.query(sql, params);
};