
import z from 'zod';

export enum SupportedMessages {
    createRoom = "CREATE_ROOM",
    joinRoom = "JOIN_ROOM",
    sendMessage = "SEND_MESSAGE"
}

export const InitMessage = z.object({
    senderId: z.string(),
    receiverId: z.string()
})

export type InitMessageType = z.infer<typeof InitMessage>

export const JoinMessage = z.object({
    userId: z.string(),
    roomId: z.string()
})

export type JoinMessageType = z.infer<typeof JoinMessage>

export type IncomingMessageType = {
    type: SupportedMessages.createRoom,
    payload: InitMessageType
} | {
    type: SupportedMessages.joinRoom,
    payload: JoinMessageType
} | {
    type: SupportedMessages.sendMessage,
    payload: {
        message: string
    }
}