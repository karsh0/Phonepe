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
  return (
    <div
      className={`flex gap-5 items-center px-3 py-3 cursor-pointer hover:bg-green-300 rounded-xl ${
        selectedUser?.username === data.user.userId.username ? "bg-green-300" : ""
      }`}
      onClick={() => setSelectedUser({
        userId: data.user.userId._id,
        username: data.user.userId.username,
        accountId: data.user._id
      })}
    >
      <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
        <UserIcon />
      </div>
      <span className="text-xl font-semibold">{data.user.userId.username}</span>
    </div>
  );
}
