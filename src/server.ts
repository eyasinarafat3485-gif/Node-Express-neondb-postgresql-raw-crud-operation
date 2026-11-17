import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config/index.js";
const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: config.connection_string,
});
// console.log(pool);

const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            age INT,
            is_Active BOOLEAN DEFAULT true,
            create_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            );
            `);
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

initDB();

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.status(200).json({
    success: true,
    message: "Welcome to Express server",
    author: "EA",
  });
});

// User create post method
app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    //   const body = req.body;

    const { name, email, password, age } = req.body;
    const result = await pool.query(
      `
    INSERT INTO users (name, email, password, age) VALUES 
    ($1,$2,$3,$4) RETURNING * 
    `,
      [name, email, password, age],
    );
    console.log(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

// User info get method
app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
      `);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "Users retrived successfully done!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

// Single user info get method
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      SELECT * FROM users WHERE id=$1
      `,
      [id],
    );
    // console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

// User info update put method
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, age, is_Active } = req.body;

    const result = await pool.query(
      `
      UPDATE users 
      SET 
      name = COALESCE($1, name),
      password = COALESCE($2, password),
      age = COALESCE($3, age),
      is_Active = COALESCE($4, is_Active),
      updated_at = NOW()
      WHERE id=$5 RETURNING *
      `,
      [name ?? null, password ?? null, age ?? null, is_Active ?? null, id],
    );
    // console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Users updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

// User delete method
app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id=$1
      `,
      [id],
    );
    // console.log(result);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

app.listen(config.port, () => {
  console.log(`The Express server is running on the port ${config.port}`);
});
