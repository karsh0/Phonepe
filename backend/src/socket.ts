import { connection } from "mongoose";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:8080})

interface Users{
    socket:any,
    username:string,
    roomId: string
}

let allSockets:Users[] = []

wss.on("connection", (socket)=>{
    socket.on("message",(message)=>{
        let parsedMessage = JSON.parse(message as unknown as string)
        if(parsedMessage.type == "join"){
            allSockets.push({
                socket,
                username:parsedMessage.payload.username,
                roomId: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type == "chat"){
            const user = allSockets.find((u) => u.socket == socket);
            const rooms = allSockets.filter((x) => x.roomId == user?.roomId)
            rooms.map((x) => x.socket.send(parsedMessage.payload.message))
        }
    })
})