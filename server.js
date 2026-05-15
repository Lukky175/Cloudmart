const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "cloudmart",
  port: Number(process.env.DB_PORT || 5432),

  ssl:
    process.env.DB_SSL === "false"
      ? false
      : {
          rejectUnauthorized: false,
        },
});

async function initializeDatabase() {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  console.log("Database initialized");
}

app.get("/api/health", (req, res) => {

  res.json({
    status: "running",
    application: "CloudMart Platform",
    deployment: "AWS ECS + EKS",
    database: "PostgreSQL"
  });

});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/users", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT * FROM customers
      ORDER BY id DESC
    `);

    res.json(result.rows);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

app.post("/api/users", async (req, res) => {

  const { name } = req.body;

  try {

    const result = await pool.query(
      `
      INSERT INTO customers(name)
      VALUES($1)
      RETURNING *
      `,
      [name]
    );

    res.json(result.rows[0]);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

const port = Number(process.env.PORT || 3000);

initializeDatabase()
  .then(() => {

    app.listen(port, () => {
      console.log(`CloudMart backend running on port ${port}`);
    });

  })
  .catch((err) => {

    console.error("Database initialization failed", err);

    process.exit(1);

  });