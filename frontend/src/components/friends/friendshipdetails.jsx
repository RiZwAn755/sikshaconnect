import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../utils/loader.jsx";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const baseurl = import.meta.env.VITE_BASE_URL;
const userid = localStorage.getItem("userid");

const fetchFriendshipDetails = async (friendshipId) => {
  const res = await axios.get(
    `${baseurl}/api/friendship/${friendshipId}`,
    { withCredentials: true }
  );
  return res.data.friendship;
};


const FriendshipDetails = () => {
  const { friendshipId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data: friendship } = useQuery({
    queryKey: ["friendshipDetails", friendshipId],
    queryFn: () => fetchFriendshipDetails(friendshipId),
    enabled: !!friendshipId,
    staleTime: 10000,
  });

  

     const removeMutateFriend = useMutation({
    mutationFn: async () => {
              await axios.delete(`${baseurl}/api/friendship/${friendshipId}`, {
              data: { user1: u1._id, user2: u2._id },
             withCredentials: true,
      });
    },
    onSuccess: async () => {
              alert(`You have removed ${friend.username || friend.name} from your friends list.`);
              await queryClient.invalidateQueries({ queryKey: ["friendlist"] });
              navigate("/friendlist");
    },
    onError: (err) => {
              console.error("Error removing friend:", err);
              alert("Unable to remove friend");
    },

  });


  if (isLoading) return <Loader />;
  if (error) return <h3 className="text-red-500">Something went wrong</h3>;

  const u1 = friendship.user1;
  const u2 = friendship.user2;
  const friend = u1._id === userid ? u2 : u1;




  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

      
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-black">
          Friendship Details
        </h1>
      </div>

      
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 space-y-6">

       
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-lg font-medium text-gray-600">
              {(friend.name || friend.username || "").charAt(0)}
            </span>
          </div>

          <div>
            <div className="text-lg font-semibold text-black">
              {friend.name || friend.username}
            </div>
            <div className="text-sm text-gray-500">
              @{friend.username}
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium text-black">
              {friendship.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Connected Since</p>
            <p className="font-medium text-black">
              {friendship.connectedAt
                ? new Date(friendship.connectedAt).toLocaleDateString()
                : "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Streak Count</p>
            <p className="font-medium text-black">
              {friendship.streak?.count || 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Last Streak Update</p>
            <p className="font-medium text-black">
              {friendship.streak?.updatedAt
                ? new Date(friendship.streak.updatedAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>

        
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500 mb-1">Current Task</p>
          <p className="font-medium text-black">
            {friendship.currentTask
              ? friendship.currentTask.title
              : "No active task"}
          </p>
        </div>

        
        <div className="flex gap-3 pt-4 border-t">
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            Message
          </button>

          <button onClick={()=> removeMutateFriend.mutate()} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
            Remove Friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendshipDetails;
