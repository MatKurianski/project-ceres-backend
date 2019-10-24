const mysql = require('mysql')
const {dbConfig} = require('./../config')

const pool = mysql.createPool(dbConfig)

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
    }
}
  if (connection) connection.release()
  return
})

pool.query('CREATE TABLE IF NOT EXISTS Usuarios(id int(10) not null primary key auto_increment, nome varchar(191) not null, email varchar(100) not null, senha binary(60) not null);', (err, results) => {
  if(err) throw err;
})

module.exports = pool
