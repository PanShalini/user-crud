const { pool, Client } = require("pg");

const pool = new pool({
  user: "postgress",
  host: "localhost",
  database: "myDB",
  password: "Neelayu@123",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
