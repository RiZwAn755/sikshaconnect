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
    const [searchQuery, setSearchQuery] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const isFormValid = () => title.trim() !== "" && duration > 0 && selectedUsers.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setIsSubmitting(true);
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
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const amountValue = duration ? Number(duration) * 10 : 25;

    if (isLoading) return <Loader />;

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
        <div className="min-h-[80vh] flex justify-center py-12 px-4 bg-slate-50">
            <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-sm overflow-visible h-auto">
                
                <div className="px-6 sm:px-8 py-6 border-b border-gray-100 bg-slate-50/50">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                      {selectedUsers.length > 1 ? "Create Group Task" : "Create a Task"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                      Set up a new task and invite your connections.
                  </p>
                </div>

                <div className="px-6 sm:px-8 py-8">
                {!showPayment ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Database Systems Revision"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="block w-full border border-gray-300 px-4 py-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                placeholder="What needs to be done?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="block w-full border border-gray-300 px-4 py-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition sm:text-sm resize-y"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Duration (Days) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="e.g. 7"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="block w-full border border-gray-300 px-4 py-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition sm:text-sm"
                                    required
                                />
                            </div>
                            
                            {/* Visual representation of calculation */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Estimated Amount
                                </label>
                                <div className="block w-full bg-slate-50 border border-gray-200 text-gray-500 px-4 py-2.5 rounded-lg sm:text-sm font-medium">
                                    ₹ {duration ? Number(duration) * 10 : "0"}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <div className="flex items-center justify-between mb-3">
                              <label className="block text-sm font-semibold text-gray-700">
                                  Select Participants <span className="text-red-500">*</span>
                              </label>
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium border border-blue-100">
                                {selectedUsers.length} selected
                              </span>
                            </div>
                            
                            <div className="relative mb-3">
                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"></path></svg>
                               </div>
                               <input
                                   type="text"
                                   placeholder="Search connections..."
                                   value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)}
                                   className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                               />
                            </div>

                            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-slate-50/50">
                                {filteredFriendships?.length > 0 ? (
                                   <div className="divide-y divide-gray-100">
                                      {filteredFriendships.map((f) => {
                                          const u1 = f.user1;
                                          const u2 = Array.isArray(f.user2) ? f.user2[0] : f.user2;
                                          const friend = u1._id === userid ? u2 : u1;
                                          const isSelected = selectedUsers.includes(friend._id);
                                          
                                          return (
                                              <label key={f._id} className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/50' : 'hover:bg-white'}`}>
                                                  <input 
                                                      type="checkbox"
                                                      checked={isSelected}
                                                      onChange={() => handleUserToggle(friend._id)}
                                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0"
                                                  />
                                                  <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
                                                      {(friend.name || friend.username || "?").charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-800 break-all">
                                                        {friend.name || friend.username}
                                                    </span>
                                                  </div>
                                              </label>
                                          );
                                      })}
                                   </div>
                                ) : (
                                   <div className="p-4 text-center text-sm text-gray-500">
                                      {friendships?.length === 0 ? "You don't have any connections yet." : "No connections match your search."}
                                   </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!isFormValid() || isSubmitting}
                                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center justify-center
                                    ${isFormValid() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}
                                    ${isSubmitting ? "opacity-80" : ""}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "Create & Proceed to Pay"
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Task Created!</h3>
                        <p className="text-sm text-gray-500 mb-6">Complete your payment to activate the task.</p>
                        
                        <div className="bg-slate-50 border border-gray-100 rounded-xl p-1 -mx-4 -mb-4">
                           <PayButton amountvalue={amountValue} taskId={createdTaskId} />
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default Taskform;