import { DataTypes, Model } from "sequelize";
import { matrixDatabaseConnection } from "../db";
import { RoomMembershipsType } from "../types/room_membership";

interface RoomMembershipsModel extends Model<any, any> {
    [user_id: string]: any;
    room_memberships: RoomMembershipsType
}

export const RoomMemberships = matrixDatabaseConnection.define<RoomMembershipsModel>("room_memberships", {
    event_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    room_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    membership: {
        type: DataTypes.STRING,
        allowNull: false
    },
    forgotten: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    display_name: {
        type: DataTypes.STRING,
    },
    avatar_url: {
        type: DataTypes.STRING,
    },
    event_stream_ordering: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, { timestamps: false })