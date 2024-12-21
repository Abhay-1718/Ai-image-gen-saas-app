import express from "express"
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDb from './config/mongoDb.js'

const app = express();
const port = process.env.PORT || 4000
connectDb()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true
}));
app.get('/' , (req,res) => {
res.send("api working ")
}
)

app.listen(port, () => {
    console.log(`server started at PORT : ${port}`);
    
})