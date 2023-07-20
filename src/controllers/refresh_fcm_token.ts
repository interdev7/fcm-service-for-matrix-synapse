import { Request, Response } from "express";
import { Log } from "../helpers/coloredLog";
import { Profiles } from "../models/profiles";
import { FcmRequestType } from "../types/fcm_request";

export const refresh_fcm_token = async (req: Request, res: Response) => {
    const { user_id, fcm_token } = req.body as FcmRequestType
	console.log(req.body)
    const user = await Profiles.findOne({ where: { full_user_id: user_id }, attributes: ["full_user_id", "fcm_token"] })
    if (user) {
        if (!user.token || user.fcm_token != fcm_token) {
            Profiles.update({ fcm_token }, { where: { full_user_id: user_id } }).then(val => {
                Log({ type: "success", message: "[FCM_TOKEN] updated successfully" })
                return res.send("success")
            }).catch(error => Log({ type: "error", message: error }))
        }
    }
}
