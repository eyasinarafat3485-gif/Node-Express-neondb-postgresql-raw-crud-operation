import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/users/user.route.js";
import { profileRoute } from "./modules/profile/profile.route.js";
import { authRouter } from "./modules/auth/auth.route.js";
import cookieParser from "cookie-parser"

const app: Application = express();
import fs from "fs"
import logger from "./middleware/logger.js";
import GlobalErrorHandler from "./middleware/globalErrorHandler.js";
import cors from "cors"

app.use((req, res, next) => {
  // console.log("Method -> URL -> Time:", req.method, req.url, Date.now());
  const log = `\nMethod: ${req.method} | URL : ${req.url} | Time : ${Date.now()}\n`
  fs.appendFile("logger.txt",log,(err) =>{
    console.log(err);
  })
  next();
});

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200, 
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger)
app.use(cors())


// user route
app.use("/api/v1/users", userRouter);

// profile route
app.use("/api/v1/profiles", profileRoute);

// authentication system
app.use("/api/v1/auth", authRouter)

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.status(200).json({
    success: true,
    message: "Welcome to Express server",
    author: "EA",
  });
});

// Global Error Handling Middleware
app.use(GlobalErrorHandler);

export default app;
