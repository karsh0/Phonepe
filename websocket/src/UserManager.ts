import WebSocket from "ws";
import axios from "axios";

interface User {
    userId: string;
    ws: WebSocket;
}

interface Room {
    roomId: string;
    users: User[];
}


export class UserManager {
    private rooms: Map<string, Room>;

    constructor() {
        this.rooms = new Map<string, Room>();
    }

     createRoom() {
        try {
            // Fetch roomId from the database
            // const response = await axios.get(`http://localhost:3000/user/room`, {
            //     params: { receiverId }, // Pass receiverId as query parameter
            // });
            

            const roomId = '1';

            if (!roomId) {
                console.error("Failed to retrieve roomId from DB");
                return null;
            }

            this.rooms.set(roomId, {
                roomId,
                users: []
            });
            this.broadcast(roomId, "Room created")
            console.log(`Room ${roomId} created.`);
        } catch (error) {
            console.error("Error fetching roomId from DB:", error);
            return null;
        }
    }

    joinRoom(ws: WebSocket, userId: string, roomId: string) {
        let room = this.rooms.get(roomId);

        if (!room) {
            console.log(`Room ${roomId} does not exist.`);
            return;
        }

        if (room.users.length >= 2) {
            console.log(`Room ${roomId} is full.`);
            return;
        }

        room.users.push({ userId, ws });
        console.log(`User ${userId} joined room ${roomId}`);
        this.broadcast(roomId, `User ${userId} joined the chat.`);


        if (room.users.length === 2) {
            this.broadcast(roomId, `User ${userId} joined the chat.`);
        }
    }

    // getRoom(senderId: string, receiverId: string) {
    //     const roomId1 = `${senderId}-${receiverId}`;
    //     const roomId2 = `${receiverId}-${senderId}`;
    
    //     const room1 = this.rooms.get(roomId1);
    //     const room2 = this.rooms.get(roomId2);
    
    //     if (room1) return room1;
    //     if (room2) return room2;
    
    //     return null;
    // }
    

    broadcast(roomId: string, message: string) {

        const room = this.rooms.get(roomId);
        if (!room) {
            console.log(`Broadcast failed: Room ${roomId} not found.`);
            return;
        }
    
        console.log(`Broadcasting to room ${roomId}: ${message}`);
        room.users.forEach(({ ws, userId }) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ message }));
                console.log(`Message sent to ${userId}`);
            } else {
                console.log(`Skipping ${userId}, WebSocket not open.`);
            }
        });
    }
    
}
