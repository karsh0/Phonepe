import express from "express"
import userRouter from "./routes/user"
const app = express()

app.use('/', userRouter);
app.use(express.json())
 


app.listen(3000, ()=>{
    console.log("listening at 3000")
})