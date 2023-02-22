import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./router/user.route";

const port: number = 6400;
const url = "mongodb://localhost/paymentapp";


const app = express();
app.use(express.json())
app.use(cors())
app.use("/api", userRouter)

app.get("/", (req,res) => {
    res.status(200).json({
    message: "api ready to be consumed",
    })
})


mongoose.connect(url).then(() => {
    console.log(`database is connected`)
})



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
