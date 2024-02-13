const db = require("../../server/db")

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);


const findUsernameOrEmail = (username,email) =>{
    const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
    const params = [username, email];

    return new Promise((resolve,reject) => {
        db.all(sql, params, (err,rows) =>{
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

const insertUser = (username, email, password) => {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const params = [username, email, password];

    return new Promise((resolve,reject) => {
        db.run(sql, params, (err) => {
            if(err) reject(err);
            else resolve();
        })
    });
};


const findUser = (username) =>{
    const sql = 'SELECT * FROM users WHERE username = ?';
    const params = [username];

    return new Promise((resolve,reject) => {
        db.all(sql, params, (err,rows) =>{
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

  
module.exports = {findUsernameOrEmail,insertUser,findUser};