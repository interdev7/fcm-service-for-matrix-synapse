import cors from "cors";
import express from "express";
import { refresh_fcm_token } from "./controllers/refresh_fcm_token";
import { send_message } from "./controllers/send_message";
import { connectDB } from "./db";
import { synchronizeModels } from "./synchronizeModels";
import {config} from "dotenv"
config()

const server = express()

server.use(cors())
server.use(express.json())

server.post("/notify", send_message)
server.post("/fcm/token", refresh_fcm_token)

connectDB();

synchronizeModels()

server.listen(process.env.FCM_SERVICE_PORT, () => console.log(`Started on http://localhost:${process.env.FCM_SERVICE_PORT}`))