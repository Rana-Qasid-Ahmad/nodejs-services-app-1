const { Client } = require('pg');


const client = new Client({
  user: 'default',
  host: 'ep-polished-voice-12041629-pooler.us-east-1.postgres.vercel-storage.com',
  database: 'verceldb',
  password: 'r8WloOpJi6jC',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function connectToDatabase() {
  try {
    if (!client._connected) {
      await client.connect();
      console.log("Connected to the PostgreSQL database!");
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

async function closeDatabaseConnection() {
  try {
    if (client._connected) {
      await client.end();
      console.log("Connection closed.");
    }
  } catch (error) {
    console.error("Error closing the database connection:", error);
  }
}

module.exports = {
  client,
  connectToDatabase,
  closeDatabaseConnection,
};

//asas