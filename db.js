const sql = require('mssql');

const dbConfig = {
  user: 'FirdavsOkilov', 
  password: 'Firdavs786', 
  server: '192.168.0.109',
  database: 'UserManagementSystem',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  port: 1433,
};
  (async () => {
    try {
      console.log('Attempting to connect...');
      const pool = await sql.connect(dbConfig);
      console.log('Connected to the database successfully!');
      pool.close();
    } catch (err) {
      console.error('Connection error:', err.message);
      console.error('Error details:', err);
    }
  })();
