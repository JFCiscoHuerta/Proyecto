import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import mongoose from "mongoose"

import UserController from "./controllers/UserController.js"
import EventsController from "./controllers/EventsController.js"
import TeamsController from "./controllers/TeamsController.js"

dotenv.config();

const app = express()

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("Conexion exitosa a mongo"))

app.use(cors())
app.use(helmet())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hola")
})

//Users
app.post("/user/register", UserController.register)
app.post("/user/login", UserController.login)
app.put("/user/update-profile/:id", UserController.updateProfile)
//Events
app.post("/event/create", EventsController.createEvent)
//Teams
app.post("/team/create", TeamsController.createTeam)
app.post("/events/:idEvent/register/:id", TeamsController.registerEvent);

app.get("/user/list", UserController.getUsers)
app.get("/event/list", EventsController.getEvents)
app.get("/team/list", TeamsController.getTeams)

app.listen(4000, () =>console.log("Server is running"))