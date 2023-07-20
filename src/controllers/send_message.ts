import axios, { isAxiosError } from "axios";
import { Op } from "sequelize";
import { Log } from "../helpers/coloredLog";
import { config } from "dotenv";
import { Profiles } from "../models/profiles";
import { IgnoredUsers } from "../models/ignored_users";
import { RoomMemberships } from "../models/room_memberships";
import { Request, Response } from "express";
import { ReceiveMessageType } from "../types/receive_message";
config()

export const send_message = async (req: Request, res: Response) => {
    const { message, user_id, room_id, time } = req.body as ReceiveMessageType;

    const tokens: string[] = []; // Users token
    const ids = new Set() // Users id
    console.log(req.body)
    // Request for getting all users in room [room_id] except sender [user_id]
    RoomMemberships.findAll({
        where: { user_id: { [Op.ne]: user_id }, room_id },
        attributes: ["user_id"],
    }).then((roomMembers) => {
        IgnoredUsers.findOne({ where: { ignored_user_id: user_id, } }).then(ignore => {
            roomMembers.map(member => {
                ids.add(member.user_id)
            })
            if (ignore) {
                console.log("Ignored user: ", ignore.ignored_user_id);
                console.log("Ignorer user: ", ignore.ignorer_user_id);
                console.log(JSON.stringify(ignore));

                if (ids.has(ignore.ignorer_user_id)) {
                    ids.delete(ignore.ignorer_user_id)
                }
            }
            // from Set { user_id } to Array [ user_id ]
            const i = Array.from(ids).map(userId => userId)
            console.log("USERS: ", i);
            if (i.length) {
                // Request for getting all users token by users id array
                Profiles.findAll({ where: { full_user_id: i }, attributes: ["fcm_token"] }).then(accounts => {
                    accounts.map(ac => {
                        if (ac.fcm_token) {
                            tokens.push(ac.fcm_token)
                        }
                    })
                    const headers = {
                        "Content-Type": "application/json",
                        "Authorization": `key=${process.env.FCM_SERVER_KEY}`
                    };

                    const data: any = {
                        to: tokens.toString(),
                        data: {
                            roomId: room_id,
                            userId: user_id
                        },
                        notification: {
                            "body": message,
                        }
                    }
                    // Request for getting user's [displayname]
                    Profiles.findOne({ where: { full_user_id: user_id }, attributes: ["full_user_id", "displayname"] }).then(user => {
                        data.notification['title'] = user!.displayname
                        // Sending message
                        axios.post("https://fcm.googleapis.com/fcm/send", JSON.stringify(data), { headers }).then(response => {
                            console.log("========================================");
                            console.log(response.data);
                            console.log("========================================");
                            return res.send("success").status(response.status)
                        }).catch(error => {
                            if (isAxiosError(error)) {
                                Log({ type: "error", message: `Axios erro: ${JSON.stringify(error.response?.data)}` })
                            }
                        })
                    }).catch(error => Log({ type: "error", message: `Profiles find ONEs: ${error}` }))

                }).catch(error => Log({ type: "error", message: `Profiles find ALL: ${error}` }))
            }

        })


    }).catch(error => Log({ type: "error", message: error }))
};
