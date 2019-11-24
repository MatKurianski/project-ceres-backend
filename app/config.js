const dbConfig = {
    connectionLimit: 10,
    host: 'db',
    user: 'root',
    password: '123',
    database: 'ceresdb'
}

module.exports = {
  dbConfig,
  saltRounds: 10,
  secretKey: 'eacherifes'
}
