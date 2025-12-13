import { useState, use } from "react";
import axios from "axios";


const baseurl = import.meta.env.VITE_BASE_URL;

// fetch function MUST return a Promise
const fetchFriend = (username) => {
  return axios
    .get(`${baseurl}/api/friends`, {
      params: { username },
    })
    .then(res => res.data);
};

const Findfriends = () => {
  const [username, setUsername] = useState("");
  const [friendPromise, setFriendPromise] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFriendPromise(fetchFriend(username)); // create Promise
  };

  // use() during render
  const friend = friendPromise ? use(friendPromise) : null;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Results of search</h3>
         {!friend && <p>No friend found</p>}
        {friend && <p>{friend.username}</p>}
      </div>
      
    </>
  );
};

export default Findfriends;
