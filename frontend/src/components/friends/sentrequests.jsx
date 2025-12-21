import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../utils/loader.jsx";

const baseurl = import.meta.env.VITE_BASE_URL;
const userid = localStorage.getItem("userid");

const fetchRequests = async () => {
  const res = await axios.get(
    `${baseurl}/api/friendship/friends`,
    {
      params: { user1: userid }
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
  if (error) return <h3 className="text-red-500">Something went wrong 😕</h3>;

  const requests = data?.filter(f => f.status === "Requested");

  return (
    <div className="max-w-4xl mx-auto p-6">
    =
      <h1 className="text-2xl font-bold text-black mb-6">
        Sent Friend Requests
      </h1>

     
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-black">
            <tr>
              <th className="text-left px-6 py-4 text-white text-sm uppercase tracking-wider">
                Username
              </th>
              <th className="text-right px-6 py-4 text-white text-sm uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {requests?.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  className="text-center py-6 text-gray-500"
                >
                  No pending requests
                </td>
              </tr>
            ) : (
              requests.map((f) => {
                const friend =
                  f.user1._id === userid ? f.user2 : f.user1;

                return (
                  <tr
                    key={f._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-black font-medium">
                      {friend.username|| "-"}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                        Requested
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
  );
};

export default Friendrequests;
