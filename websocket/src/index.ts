import { WebSocketServer, WebSocket } from "ws";

interface User {
  socket: WebSocket;
  userId: string;
}

interface Room {
  id: string; 
  user1: string;
  user2: string;
}

const wss = new WebSocketServer({ port: 8080 });

let allSockets: User[] = [];
let allRooms: Room[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());

      if (parsedMessage.type === "join") {
        const { userId } = parsedMessage.payload;

        // Check if the user is already connected
        const existingUser = allSockets.find((u) => u.userId === userId);
        if (!existingUser) {
          allSockets.push({ socket, userId });
          console.log(`User ${userId} connected.`);
        }
      }

      if (parsedMessage.type === "startChat") {
        const { senderId, receiverId } = parsedMessage.payload;

        // Create a unique room identifier
        const roomId = `${senderId}-${receiverId}`;
        const reverseRoomId = `${receiverId}-${senderId}`;

        // Check if the room already exists
        let room = allRooms.find((r) => r.id === roomId || r.id === reverseRoomId);

        if (!room) {
          // Create the room if it doesn't exist
          room = { id: roomId, user1: senderId, user2: receiverId };
          allRooms.push(room);
          console.log(`Room created between ${senderId} and ${receiverId}`);
        } else {
          console.log(`Room already exists between ${senderId} and ${receiverId}`);
        }
      }

      if (parsedMessage.type === "chat") {
        const { senderId, receiverId, message: chatMessage } = parsedMessage.payload;

        // Find the room to validate the sender and receiver
        const roomId = `${senderId}-${receiverId}`;
        const reverseRoomId = `${receiverId}-${senderId}`;
        const room = allRooms.find((r) => r.id === roomId || r.id === reverseRoomId);

        if (room) {
          // Find the sockets of the sender and receiver
          const senderSocket = allSockets.find((u) => u.userId === senderId)?.socket;
          const receiverSocket = allSockets.find((u) => u.userId === receiverId)?.socket;

          if (receiverSocket?.readyState === WebSocket.OPEN) {
            // Send the message to the receiver
            receiverSocket.send(
              JSON.stringify({
                type: "chat",
                from: senderId,
                message: chatMessage,
              })
            );
          }

          // Optionally, send an acknowledgment back to the sender
          if (senderSocket?.readyState === WebSocket.OPEN) {
            senderSocket.send(
              JSON.stringify({
                type: "ack",
                message: "Message delivered",
              })
            );
          }
        } else {
          console.error("Invalid room or participants.");
        }
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });

  socket.on("close", () => {
    // Remove the user from `allSockets` when the connection is closed
    allSockets = allSockets.filter((user) => user.socket !== socket);

    console.log("User disconnected.");
  });
});
