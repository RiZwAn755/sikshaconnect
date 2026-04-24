import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const baseurl = import.meta.env.VITE_BASE_URL;

// Mini avatar for search results
const MiniAvatar = ({ name }) => {
  const gradients = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
    "from-pink-500 to-rose-500",
  ];
  const initial = (name || "?").charAt(0).toUpperCase();
  const idx = initial.charCodeAt(0) % gradients.length;
  return (
    <div
      className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradients[idx]} flex items-center justify-center flex-shrink-0 shadow-sm`}
    >
      <span className="text-white font-semibold text-xs">{initial}</span>
    </div>
  );
};

const Findfriends = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sentIds, setSentIds] = useState(new Set());
  const me = localStorage.getItem("userid");

  const fetchUsers = async (value) => {
    if (!value || value.length < 1) {
      setUsers([]);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${baseurl}/api/user/search`, {
        username: value,
      });
      setUsers(res.data.users || []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(fetchUsers, 1000);

  useEffect(() => {
    debouncedSearch(username);
    return () => debouncedSearch.cancel();
  }, [username]);

  const handleAddFriend = async (userId, uname) => {
    try {
      await axios.post(`${baseurl}/api/friendship/addFriend`, {
        user1: me,
        user2: userId,
      });
      setSentIds((prev) => new Set([...prev, userId]));
      alert(`Friend request sent to ${uname}`);
    } catch {
      alert("Request already sent or error occurred");
    }
  };

  return (
    <div className="space-y-3">
      {/* Section heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Find People</h2>
        {loading && (
          <span className="text-xs text-gray-400 animate-pulse">Searching…</span>
        )}
      </div>

      {/* Search input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search by username…"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition placeholder-gray-400"
        />
      </div>

      {/* Results */}
      {users.length > 0 && (
        <div className="space-y-2 pt-1">
          {users.map((u) => {
            const alreadySent = sentIds.has(u._id);
            return (
              <div
                key={u._id}
                className="flex items-center gap-3 bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 hover:border-violet-200 hover:bg-violet-50 transition-all duration-150"
              >
                <MiniAvatar name={u.username} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {u.name || u.username}
                  </p>
                  <p className="text-xs text-gray-400 truncate">@{u.username}</p>
                </div>
                <button
                  onClick={() => handleAddFriend(u._id, u.username)}
                  disabled={alreadySent}
                  className={`text-xs px-4 py-1.5 rounded-lg font-medium transition-all duration-200
                    ${alreadySent
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                      : "bg-violet-600 hover:bg-violet-700 text-white shadow-sm hover:shadow-md"
                    }`}
                >
                  {alreadySent ? "Sent ✓" : "Add Friend"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* No results */}
      {!loading && username.length > 0 && users.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-3">
          No users found for "<span className="font-medium text-gray-600">{username}</span>"
        </p>
      )}
    </div>
  );
};

export default Findfriends;
