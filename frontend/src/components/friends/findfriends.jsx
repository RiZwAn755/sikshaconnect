import { useState } from "react";
import axios from "axios";

const baseurl = import.meta.env.VITE_BASE_URL;

const Findfriends = () =>{

   const [username, setUsername] = useState("");
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const me = localStorage.getItem("userid");

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Please enter a username");
      return;
    }
    setLoading(true);
    setError("");
    setUser(null);
    try {
      const result = await axios.post(`${baseurl}/api/user/search`, { username });
      const data = result?.data;
      if (data?.user) setUser(data.user);
      else if (data?.username) setUser(data);
      else setError("User not found");
    } catch (err) {
      console.error(err);
      setError("User not found");
    } finally {
      setLoading(false);
    }
   };

   const handleAddFriend = async() => {
    try{
      console.log(me);
      console.log(user._id);
    const res = await axios.post(`${baseurl}/api/friendship/addFriend`, {
        user1: me,
        user2: user._id // sending _id of user 2 which will reduce db queries
    });
   
        alert(`Friend request sent to ${user.username || user}`);
    
    return {message: "Friend request sent successfully"};
  }  catch(err){
      if(err.status === 400 || err.response.status === 400){
        alert("You have already sent a friend request to this user");
      }else{
        alert("Unable to send friend request");
      }
    } 

  }

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
          onSubmit={handleSubmit}
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

        
        <div className="mt-10">
          <h3 className="text-lg font-medium mb-4 border-b border-white/10 pb-2">Results</h3>

          {loading && <p className="text-gray-400 text-sm">Searching...</p>}

          {!loading && error && (
            <p className="text-gray-400 text-sm">{error}</p>
          )}

          {user && (
            <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-4">
              <div>
                <p className="text-sm text-gray-400">Username</p>
                <p className="text-base font-medium">{user.username || user}</p>
              </div>

              <button onClick={handleAddFriend} className="text-sm px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition">
                Add Friend
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Findfriends;
