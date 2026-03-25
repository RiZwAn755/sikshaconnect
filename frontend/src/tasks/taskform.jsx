import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PayButton from "../components/payments/paybutton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/utils/loader.jsx";

const baseurl = import.meta.env.VITE_BASE_URL;

const Taskform = () => {
    const navigate = useNavigate();
    const { friendshipId } = useParams();
    const userid = localStorage.getItem("userid");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [showPayment, setShowPayment] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [createdTaskId, setCreatedTaskId] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // New search state

    // Fetch friends
    const { isLoading, error, data: friendships } = useQuery({
        queryKey: ["friendlist", userid],
        queryFn: async () => {
            const res = await axios.get(`${baseurl}/api/friendship/friends`, {
                params: { user1: userid },
                withCredentials: true,
            });
            return res.data.friendships?.filter(f => f.status === "Accepted") || [];
        },
        enabled: !!userid,
        staleTime: 10000,
    });

    // Auto-select if arriving from a specific friendship
    useEffect(() => {
        if (friendshipId && friendships) {
            const targetFriendship = friendships.find(f => f._id === friendshipId);
            if (targetFriendship) {
                const u1 = targetFriendship.user1;
                const u2 = Array.isArray(targetFriendship.user2) ? targetFriendship.user2[0] : targetFriendship.user2;
                const friend = u1._id === userid ? u2 : u1;
                if (friend && !selectedUsers.includes(friend._id)) {
                    setSelectedUsers([friend._id]);
                }
            }
        }
    }, [friendshipId, friendships, userid]);

    const handleUserToggle = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const isFormValid = () => {
        return title.trim() !== "" && duration > 0 && selectedUsers.length > 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            try {
                const res = await axios.post(`${baseurl}/api/task/create`, {
                    title,
                    description,
                    duration: Number(duration),
                    participantIds: selectedUsers
                }, { withCredentials: true });

                if (res.data.success) {
                    setCreatedTaskId(res.data.task._id);
                    setShowPayment(true);
                }
            } catch (err) {
                console.error("Failed to create task", err);
                alert("Failed to create group task");
            }
        }
    };

    const amountValue = duration ? Number(duration) * 10 : 25; // simple calculation

    if (isLoading) return <Loader />;

    // Filter friendships based on search query
    const filteredFriendships = friendships?.filter((f) => {
        const u1 = f.user1;
        const u2 = Array.isArray(f.user2) ? f.user2[0] : f.user2;
        const friend = u1._id === userid ? u2 : u1;
        if (!friend) return false;

        const searchLower = searchQuery.toLowerCase();
        return (
            friend.name?.toLowerCase().includes(searchLower) ||
            friend.username?.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {selectedUsers.length > 1 ? "Create Group Task" : "Create a Task"}
            </h2>
            {!showPayment && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Friends <span className="text-red-500">*</span>
                        </label>
                        
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search friends..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mb-3 block w-full border border-gray-300 p-2 rounded-md shadow-sm text-sm"
                        />

                        <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 space-y-2">
                            {filteredFriendships?.map((f) => {
                                const u1 = f.user1;
                                const u2 = Array.isArray(f.user2) ? f.user2[0] : f.user2;
                                const friend = u1._id === userid ? u2 : u1;
                                return (
                                    <label key={f._id} className="flex items-center gap-3 p-1 hover:bg-gray-50 rounded cursor-pointer">
                                        <input 
                                            type="checkbox"
                                            checked={selectedUsers.includes(friend._id)}
                                            onChange={() => handleUserToggle(friend._id)}
                                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            {friend.name || friend.username}
                                        </span>
                                    </label>
                                );
                            })}
                            
                            {friendships?.length === 0 && (
                                <span className="text-sm text-gray-500">No connections yet.</span>
                            )}
                            {friendships?.length > 0 && filteredFriendships?.length === 0 && (
                                <span className="text-sm text-gray-500">No friends match your search.</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Duration (in hours) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isFormValid()}
                            className={`px-4 py-2 bg-black text-white rounded-lg text-sm font-medium transition 
                                ${isFormValid() ? "hover:bg-gray-800" : "opacity-50 cursor-not-allowed"}`}
                        >
                            Create & Pay
                        </button>
                    </div>
                </form>
            )}

            {showPayment && createdTaskId && (
                <div className="mt-6 text-center">
                    <p className="mb-4 text-green-600 font-medium">Task created successfully!</p>
                    <PayButton amountvalue={amountValue} taskId={createdTaskId} />
                </div>
            )}
        </div>
    );
};

export default Taskform;