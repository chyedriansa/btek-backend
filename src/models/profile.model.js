const db = require ('../helpers/db')
const table = "profile"; 

exports.insertProfile = (data) =>{
    const sql = `INSERT INTO "${table}" ("fullName", "birthDate", "picture", "userId") VALUES ($1, $2, $3, $4) RETURNING * `;
    const params = [data.fullName, data.birthDate, data.picture, data.userId];
    return db.query(sql, params);
  };

exports.selectProfileByUserId = (id) => {
    const sql = `SELECT * FROM ${table} WHERE "userId" = $1`;
    const params = [id];
    return db.query(sql, params);
  };