const { Pool } = require('pg');
const { env } = require("./src/config");

const db = new Pool({
    connectionString: env.DATABASE_URL || 'postgresql://hani:sonu246162@localhost:5432/school_mgmt',
  });

db.connect()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  })
  .finally(() => {
    db.end(); // Close the connection
  });

