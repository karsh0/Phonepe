import express from "express"
import userRouter from "./routes/user"
const app = express()

app.use('/', userRouter);
 


app.listen(3000)