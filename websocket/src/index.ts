import WebSocket, { WebSocketServer } from "ws";
import { UserManager } from "./UserManager";
import { IncomingMessageType, SupportedMessages } from "./messages/IncomingMessages";

const wss = new WebSocketServer({ port: 8080 });
const userManager = new UserManager();

wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (data: string) => {
        try {
            const message: IncomingMessageType = JSON.parse(data);
            const { type, payload } = message;
            let roomId: any;
            if (type === SupportedMessages.createRoom) {
                if (!payload.senderId || !payload.receiverId) {
                    ws.send(JSON.stringify({ error: "Missing senderId or receiverId" }));
                    return;
                }
                roomId = userManager.createRoom(payload.senderId, payload.receiverId);
                ws.send(JSON.stringify({ type: "ROOM_CREATED", roomId }));
            }


            if (type === SupportedMessages.joinRoom) {
                userManager.joinRoom(ws, payload.userId, roomId);
                ws.send(JSON.stringify({ type: "ROOM_JOINED", roomId }));
            }

        } catch (error) {
            console.error("Error handling WebSocket message:", error);
            ws.send(JSON.stringify({ error: "Invalid message format" }));
        }
    });

    ws.on("close", () => {
        console.log("User disconnected");
    });
});

console.log("WebSocket server running on ws://localhost:8080");
