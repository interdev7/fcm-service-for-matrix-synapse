export type RoomMembershipsType = {
    event_id: string
    user_id: string
    sender: string
    room_id: string
    membership: string
    forgotten: number
    display_name: string
    avatar_url: string
    event_stream_ordering: number
}