import axios from "axios";
import FindFriends from "./findfriends.jsx";
import { useQuery } from "@tanstack/react-query";
import Loader from "../utils/loader.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const baseurl = import.meta.env.VITE_BASE_URL;
const userid = localStorage.getItem("userid");

const fetchFriends = async () => {
  const res = await axios.get(
    `${baseurl}/api/friendship/friends`,
    {
      params: { user1: userid }
    }
  );

  return res.data.friendships;
};

const FriendList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error } = useQuery({
    queryKey: ["friendlist", userid],
    queryFn: fetchFriends,
    enabled: !!userid,
    staleTime: 10000,
  });

  if (isLoading) return <Loader />;
  if (error) return <h3 className="text-red-500">Something went wrong 😕</h3>;

  const tabs = [
    { label: "Friends", path: "/friendlist" },
    { label: "Sent Requests", path: "/friendrequests" },
    { label: "Pending Requests", path: "/pendingrequests" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-black">
        Connections
      </h1>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-gray-200">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`px-5 py-2 rounded-t-lg font-medium transition
                ${
                  active
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black hover:bg-red-100 hover:text-red-600"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 space-y-6">

        {/* Find Friends */}
        <FindFriends />

        {/* Empty State Placeholder */}
        <div className="text-center text-gray-500 text-sm">
          Select a tab above to manage your connections
        </div>
      </div>

    </div>
  );
};

export default FriendList;
