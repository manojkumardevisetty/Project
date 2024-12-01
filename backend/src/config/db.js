const { Pool } = require("pg");
const { env } = require("./env");

const db = new Pool({
  connectionString: env.DATABASE_URL,
});
 

db.connect()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  })


module.exports = { db };
