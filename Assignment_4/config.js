module.exports = {
  dbConnection: {
    user: "postgres",
    password: "1234",
    host: "localhost",
    database: "Sample",
    port: 5432,
  },
  server: {
    PORT: 3000,
  },
  jwtConfig: {
    algorithm: "HS256",
    secretKey: "Test@12345",
  },
};
