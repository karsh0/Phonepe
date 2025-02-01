import express from "express"
import userRouter from "./routes/user"
import router from "./routes/account"
import cors from "cors"
const app = express()

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(express.json())
app.use('/user', userRouter);
app.use('/account', router);


app.listen(3000, ()=>{
    console.log("listening at 3000")
})