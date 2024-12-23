import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongoDb.js";
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoutes.js'

const app = express();
const port = process.env.PORT || 4000;
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

//api endpoints
app.get("/", (req, res) => {
  res.send("api working ");
});
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


app.listen(port, () => {
  console.log(`server started at PORT : ${port}`);
});
