import { matrixDatabaseConnection } from "../db";
import { DataTypes, Model } from "sequelize";
import { ProfileType } from "../types/profile";

interface ProfilesModel extends Model<any, any> {
    [x: string]: any;
    user: ProfileType
}

export const Profiles = matrixDatabaseConnection.define<ProfilesModel>("profiles", {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    displayname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar_url: {
        type: DataTypes.STRING,
    },
    full_user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fcm_token: {
        type: DataTypes.STRING
    }
}, { timestamps: false })