import WebSocket from "ws";

interface User {
    userId: string;
    ws: WebSocket;
}

interface Room {
    roomId: string;
    senderId: string;
    receiverId: string;
    users: User[];
}

// let globalRoomId = 1;

export class UserManager {
    private rooms: Map<string, Room>;

    constructor() {
        this.rooms = new Map<string, Room>();
    }

    createRoom(senderId: string, receiverId: string) {
        const roomId = '1';
        this.rooms.set(roomId, {
            roomId,
            senderId,
            receiverId,
            users: []  
        });
        this.broadcast(roomId, 'This is roomId')
        return roomId;
    }

    getRoom(senderId: string, receiverId: string) {
        const user1Room = this.rooms.get(senderId);
        const user2Room = this.rooms.get(receiverId);
    
        if (user1Room && user1Room === user2Room) {
            return user1Room;
        }
        
        if (user1Room) {
            return user1Room;
        }
        
        if (user2Room) {
            return user2Room;
        }
    
        return null;
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
        
        if (room.users.length === 2) {
            this.broadcast(roomId, `User ${userId} joined the chat.`);
        }
    }

    broadcast(roomId: string, message: string) {
        const room = this.rooms.get(roomId);
        if (!room) return;

        room.users.forEach(({ ws }) => {
            ws.send(JSON.stringify({ message }));
        });
    }
}
