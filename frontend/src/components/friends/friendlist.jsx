import axios from "axios";
import FindFriends from "./findfriends.jsx";
import { useQuery } from "@tanstack/react-query";
import Loader from "../utils/loader.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const baseurl = import.meta.env.VITE_BASE_URL;
const userid = localStorage.getItem("userid");

const fetchFriends = async () => {
  const res = await axios.get(`${baseurl}/api/friendship/friends`, {
    params: { user1: userid },
    withCredentials: true,
  });
  return res.data.friendships;
};

// Avatar with gradient background based on first letter
const Avatar = ({ name }) => {
  const gradients = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-blue-600",
  ];
  const initial = (name || "?").charAt(0).toUpperCase();
  const idx = initial.charCodeAt(0) % gradients.length;
  return (
    <div
      className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradients[idx]} flex items-center justify-center flex-shrink-0 shadow-sm`}
    >
      <span className="text-white font-semibold text-sm">{initial}</span>
    </div>
  );
};

const FriendList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["friendlist", userid],
    queryFn: fetchFriends,
    enabled: !!userid,
    staleTime: 10000,
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-red-500 font-medium">Something went wrong 😕</p>
      </div>
    );

  const tabs = [
    { label: "Friends", path: "/friendlist" },
    { label: "Sent Requests", path: "/friendrequests" },
    { label: "Pending Requests", path: "/pendingrequests" },
  ];

  const friends = data?.filter((f) => f.status === "Accepted") || [];

  return (
    <div className="w-full min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Connections</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your friends and requests</p>
          </div>

          {/* Header search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search connections..."
              className="pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition w-60"
            />
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm w-fit">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${active
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Main Content Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Find Friends Section */}
          <div className="px-6 py-5 border-b border-gray-100">
            <FindFriends />
          </div>

          {/* Friends List */}
          <div className="px-6 py-5">
            {friends.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 font-semibold text-lg">No connections yet</p>
                  <p className="text-gray-400 text-sm mt-1">Search for people above to send friend requests</p>
                </div>
                <button
                  onClick={() => document.querySelector('input[placeholder="Enter username"]')?.focus()}
                  className="mt-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Find Friends
                </button>
              </div>
            ) : (
              /* Friend Cards */
              <ul className="divide-y divide-gray-100">
                {friends.map((f) => {
                  const u1 = f.user1 && f.user1._id ? f.user1 : f.user1;
                  const u2Raw = f.user2 && f.user2._id ? f.user2 : f.user2;
                  const u2 = Array.isArray(u2Raw) ? u2Raw[0] : u2Raw;
                  const other = u1._id === userid ? u2 : u1;
                  const displayName = other.name || other.username || "Unknown";

                  return (
                    <li
                      key={f._id}
                      className="flex items-center gap-4 py-4 group hover:bg-slate-50 -mx-6 px-6 transition-colors duration-150"
                    >
                      {/* Avatar */}
                      <Avatar name={displayName} />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{displayName}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">@{other.username}</p>
                      </div>

                      {/* Online dot (decorative) */}
                      {/* <div className="hidden sm:flex items-center gap-1.5 mr-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span className="text-xs text-gray-400">Online</span>
                      </div> */}

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => navigate(`/friendship/${f._id}`)}
                          className="px-4 py-2 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:border-violet-400 hover:text-violet-600 transition-all duration-200 bg-white hover:bg-violet-50"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => navigate(`/taskForm/${f._id}`)}
                          className="px-4 py-2 text-xs font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          Start Task
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer count */}
          {friends.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                {friends.length} connection{friends.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
