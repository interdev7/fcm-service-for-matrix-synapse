import { Log } from "./helpers/coloredLog"
import { IgnoredUsers } from "./models/ignored_users"
import { Profiles } from "./models/profiles"
import { RoomMemberships } from "./models/room_memberships"

export const synchronizeModels = () => {
    RoomMemberships.sync().then(() => {
        Log({ type: "success", message: "[ROOM_MEMBERSHIPS] table created successfully" })
    }).catch(() => {
        Log({ type: "error", message: "Error while creating [ROOM_MEMBERSHIPS] table" })
    })

    Profiles.sync().then(() => {
        Log({ type: "success", message: "[PROFILES] table created successfully" })
    }).catch(() => {
        Log({ type: "error", message: "Error while creating [PROFILES] table" })
    })

    IgnoredUsers.sync().then(() => {
        Log({ type: "success", message: "[IGNORED_USERS] table created successfully" })
    }).catch(() => {
        Log({ type: "error", message: "Error while creating [IGNORED_USERS] table" })
    })
}