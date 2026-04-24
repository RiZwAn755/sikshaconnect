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

  const u1 = friendship?.user1;
  const u2Raw = friendship?.user2;
  const u2 = Array.isArray(u2Raw) ? u2Raw[0] : u2Raw;
  const friend = u1 && u1._id === userid ? u2 : u1;

  const removeMutateFriend = useMutation({
    mutationFn: async () => {
      await axios.delete(`${baseurl}/api/friendship/${friendshipId}`, {
        data: { user1: u1._id, user2: u2._id },
        withCredentials: true,
      });
    },
    onSuccess: async () => {
      alert(`You have removed ${friend?.username || friend?.name} from your friends list.`);
      await queryClient.invalidateQueries({ queryKey: ["friendlist"] });
      navigate("/friendlist");
    },
    onError: (err) => {
      console.error("Error removing friend:", err);
      alert("Unable to remove friend");
    },
  });

  if (isLoading) return <Loader />;
  if (error || !friend) return <h3 className="text-red-500 text-center mt-10">Something went wrong</h3>;

  const displayName = friend.name || friend.username || "Unknown";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-900 transition flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
        >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
           </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Connection Profile
        </h1>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Profile Header Area */}
        <div className="p-6 sm:p-8 flex items-center gap-5 border-b border-gray-100 bg-slate-50/50">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shadow-sm shrink-0">
             {initial}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
            <p className="text-sm text-gray-500 font-medium">@{friend.username}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6 sm:p-8">
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                <p className="font-medium text-gray-900 flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                   {friendship.status}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Connected</p>
                <p className="font-medium text-gray-900">
                  {friendship.connectedAt ? new Date(friendship.connectedAt).toLocaleDateString() : "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Streak</p>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  🔥 {friendship.streak?.count || 0}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Last Update</p>
                <p className="font-medium text-gray-900">
                  {friendship.streak?.updatedAt ? new Date(friendship.streak.updatedAt).toLocaleDateString() : "—"}
                </p>
              </div>
           </div>
        </div>

        {/* Current Task */}
        <div className="p-6 sm:p-8 border-t border-gray-100 bg-slate-50/30">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Current Task</p>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
             <p className="font-medium text-gray-900">
               {friendship.currentTask ? friendship.currentTask.title : "No active task currently."}
             </p>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-6 border-t border-gray-100 flex flex-wrap gap-3 bg-gray-50/50">
          <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">
            Send Message
          </button>
          
          <button 
            onClick={() => {
               if(window.confirm("Are you sure you want to remove this connection?")) {
                  removeMutateFriend.mutate()
               }
            }} 
            disabled={removeMutateFriend.isPending}
            className="px-5 py-2.5 bg-white border border-gray-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 hover:border-red-200 transition shadow-sm ml-auto"
          >
            {removeMutateFriend.isPending ? "Removing..." : "Remove Connection"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FriendshipDetails;
