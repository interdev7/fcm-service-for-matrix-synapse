import { Sequelize } from "sequelize"
import "dotenv/config"
import { Log } from "./helpers/coloredLog"
import { DatabaseConnectionType } from "./types/database_connection"

const matrixDB: DatabaseConnectionType = {
    host: String(process.env.MATRIX_DB_HOST),
    port: Number(process.env.MATRIX_DB_PORT),
    user: String(process.env.MATRIX_DB_USERNAME),
    pass: String(process.env.MATRIX_DB_PASSWORD),
    db: String(process.env.MATRIX_DB_NAME)
}

export const matrixDatabaseConnection = new Sequelize(`postgres://${matrixDB.user}:${matrixDB.pass}@${matrixDB.host}:${matrixDB.port}/${matrixDB.db}`)

export const connectDB =  () => {
    matrixDatabaseConnection.authenticate().then(v => {
        Log({ type: "success", message: "[MATRIX] DataBase connected successfully" })
    }).catch(error => {
        Log({ type: "error", message: "[MATRIX] Error with connection" })
        console.log(error);
    })
}