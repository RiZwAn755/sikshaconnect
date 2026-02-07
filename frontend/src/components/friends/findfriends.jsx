import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const baseurl = import.meta.env.VITE_BASE_URL;

const Findfriends = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
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
    } catch (err) {
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

      alert(`Friend request sent to ${uname}`);
    } catch (err) {
      alert("Request already sent or error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-center">
          Find <span className="text-red-500">Friends</span>
        </h1>
        <p className="text-sm text-gray-400 text-center mt-2">
          Search users by username
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition rounded-xl px-6 py-3 text-sm font-medium tracking-wide"
          >
            Search
          </button>
        </form>

        <div className="mt-6">
          {loading && <p className="text-gray-400 text-sm">Searching...</p>}

          {users.length > 0 && (
            <div className="space-y-3">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-4"
                >
                  <p className="text-sm font-medium">{u.username}</p>

                  <button
                    onClick={() => handleAddFriend(u._id, u.username)}
                    className="text-sm px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
                  >
                    Add Friend
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Findfriends;
