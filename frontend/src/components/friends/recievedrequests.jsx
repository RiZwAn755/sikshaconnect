import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../utils/loader.jsx";

const baseurl = import.meta.env.VITE_BASE_URL;
const userid = localStorage.getItem("userid");

const fetchRequests = async () => {
  const res = await axios.get(
    `${baseurl}/api/friendship/friends`,
    {
      params: { user1: userid },
      withCredentials: true,
    }
  );
  return res.data.friendships;
};

const Friendrequests = () => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["friendreqs", userid],
    queryFn: fetchRequests,
    enabled: !!userid,
    staleTime: 10000,
  });

  if (isLoading) return <Loader />;
  if (error) return <h3 className="text-red-500 text-center mt-10">Something went wrong 😕</h3>;

  const requests = data?.filter(f => {
    const isUser2 = Array.isArray(f.user2) ? f.user2.some(u => u._id === userid) : f.user2._id === userid;
    return f.status === "Requested" && isUser2;
  });

  const handleAction = async (user1, user2, action) => {
    try {
      await axios.put(`${baseurl}/api/friendship/actionRequest`, {
        user1,
        user2,
        action
      }, { withCredentials: true });
      queryClient.invalidateQueries(["friendreqs", userid]);
      queryClient.invalidateQueries(["friendlist", userid]);
    } catch (err) {
      console.error("Error:", err);
      alert("Action failed");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 py-8 sm:px-6 lg:px-8">
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pending Requests</h1>
        <p className="text-sm text-gray-500 mt-1">Review friend requests from others.</p>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {(!requests || requests.length === 0) ? (
                <tr>
                  <td colSpan="2" className="px-6 py-12 text-center text-gray-500 text-sm">
                    No pending requests received.
                  </td>
                </tr>
              ) : (
                requests.map((f) => {
                  const friend = f.user1; // sender
                  const displayName = friend?.name || friend?.username || "-";

                  return (
                    <tr key={f._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0">
                              {displayName.charAt(0).toUpperCase()}
                           </div>
                           <div>
                             <p className="font-medium text-gray-900 text-sm">{displayName}</p>
                             {friend?.username && <p className="text-xs text-gray-500">@{friend.username}</p>}
                           </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button
                             onClick={() => handleAction(friend._id, userid, "Accept")}
                             className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
                           >
                             Accept
                           </button>
                           <button
                             onClick={() => handleAction(friend._id, userid, "Reject")}
                             className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-200 transition shadow-sm"
                           >
                             Reject
                           </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Friendrequests;
