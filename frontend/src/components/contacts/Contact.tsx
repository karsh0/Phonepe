import axios from "axios";
import { BACKEND_URL } from "../../config";
import { UserIcon } from "../ui/UserIcon";

export function Contact({
  data,
  selectedUser,
  setSelectedUser,
  ws
}: {
  data: any;
  selectedUser: any; 
  setSelectedUser: any;
  ws: WebSocket | null
}) {


  interface RoomResponse{
    message: string,
    roomId: string
  }

  async function createRoom() {
    const newSelectedUser = {
      userId: data.user.userId._id,
      username: data.user.userId.username,
      accountId: data.user._id,
    };
  
    setSelectedUser(newSelectedUser);
  
    try {
      const response = await axios.post<RoomResponse>(`${BACKEND_URL}/user/room`, {
        receiverId: newSelectedUser.userId, 
      },{
        headers:{
          Authorization: localStorage.getItem("token")
        }
      });

      ws?.send(JSON.stringify({
        type: "CREATE_ROOM",
        payload: {
          senderId: data.user.userId._id,
          receiverId: newSelectedUser.userId,
          roomId: response.data.roomId
        }
      }))

      alert(response.data.message);
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room");
    }
  }
  

  return (
    <div
      className={`flex gap-5 items-center px-3 py-3 cursor-pointer hover:bg-green-300 rounded-xl ${
        selectedUser?.username === data.user.userId.username ? "bg-green-300" : ""
      }`}
      onClick={createRoom}
    >
      <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
        <UserIcon />
      </div>
      <span className="text-xl font-semibold">{data.user.userId.username}</span>
    </div>
  );
}
