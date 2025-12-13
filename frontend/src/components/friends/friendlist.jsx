import Findfriends from "./findfriends";
import { useState } from "react";
// added friends
const FriendList = () => {
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
            <div>
                <Findfriends/>
                <h1>Your Friends</h1>
                <table>
                    <thead>
                        <tr>
                            <td> name</td>
                            <td>username</td>
                            <td>streak</td>
                            <td>currentTask</td>
                        </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>friend.name</td>
                        <td>friend.username</td>
                        <td>friend.streak</td>
                        <td>friend.currentTask</td>
                      </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FriendList;