import axios from "axios";
import { BACKEND_URL } from "../../config";
import { UserIcon } from "../ui/UserIcon";

export function Contact({
  data,
  selectedUser,
  setSelectedUser,
}: {
  data: any;
  selectedUser: any; 
  setSelectedUser: any;
}) {

  async function createRoom() {
    const newSelectedUser = {
      userId: data.user.userId._id,
      username: data.user.userId.username,
      accountId: data.user._id,
    };
  
    setSelectedUser(newSelectedUser);
  
    try {
      alert('creating room')
      const response = await axios.post(`${BACKEND_URL}/user/room`, {
        receiverId: newSelectedUser.userId, 
      });
      console.log(response.data)
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
      onClick={()=> createRoom()}
    >
      <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
        <UserIcon />
      </div>
      <span className="text-xl font-semibold">{data.user.userId.username}</span>
    </div>
  );
}
