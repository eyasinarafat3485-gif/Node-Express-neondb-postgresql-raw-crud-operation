import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db/index.js";
import { userRouter } from "./modules/users/user.route.js";
import { profileRoute } from "./modules/profile/profile.route.js";
import { authRouter } from "./modules/auth/auth.route.js";
const app: Application = express();
// const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// user route
app.use("/api/v1/users", userRouter);

// profile route
app.use("/api/v1/profiles", profileRoute);

// 
app.use("/api/v1/auth", authRouter)

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.status(200).json({
    success: true,
    message: "Welcome to Express server",
    author: "EA",
  });
});


export default app;
