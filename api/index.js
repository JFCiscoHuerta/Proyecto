import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();

const app = express()

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("Conexion exitosa a mongo"))

app.use(cors())
app.use(helmet())

app.get("/", (req, res) => {
    res.send("Hola")
})

app.listen(4000, () =>console.log("Server is running"))