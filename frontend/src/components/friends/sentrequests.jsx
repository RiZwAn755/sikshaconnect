import axios from "axios";
import { useQuery } from "@tanstack/react-query";
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
  const { isLoading, error, data } = useQuery({
    queryKey: ["friendreqs", userid],
    queryFn: fetchRequests,
    enabled: !!userid,
    staleTime: 10000,
  });

  if (isLoading) return <Loader />;
  if (error) return <h3 className="text-red-500 text-center mt-10">Something went wrong 😕</h3>;

  const requests = data?.filter(f => f.status === "Requested" && f.user1._id === userid);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 py-8 sm:px-6 lg:px-8">
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Sent Requests</h1>
        <p className="text-sm text-gray-500 mt-1">Manage friend requests you have sent to others.</p>
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
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {(!requests || requests.length === 0) ? (
                <tr>
                  <td colSpan="2" className="px-6 py-12 text-center text-gray-500 text-sm">
                    No pending requests sent.
                  </td>
                </tr>
              ) : (
                requests.map((f) => {
                  const friend = Array.isArray(f.user2) ? f.user2[0] : f.user2;
                  const displayName = friend?.name || friend?.username || "-";

                  return (
                    <tr key={f._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                              {displayName.charAt(0).toUpperCase()}
                           </div>
                           <div>
                             <p className="font-medium text-gray-900 text-sm">{displayName}</p>
                             {friend?.username && <p className="text-xs text-gray-500">@{friend.username}</p>}
                           </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-yellow-50 text-yellow-700 border border-yellow-200">
                          Pending
                        </span>
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
