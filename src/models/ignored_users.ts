import { DataTypes, Model } from "sequelize";
import { matrixDatabaseConnection } from "../db";
import { IgnoredUseresType } from "../types/ignored_users";

interface IgnoredUsersModel extends Model<any, any> {
    [x: string]: any
    ignored_users: IgnoredUseresType
}

export const IgnoredUsers = matrixDatabaseConnection.define<IgnoredUsersModel>("ignored_users", {
    ignorer_user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ignored_user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { timestamps: false })
IgnoredUsers.removeAttribute("id")
