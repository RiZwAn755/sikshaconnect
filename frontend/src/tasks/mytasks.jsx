import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/utils/loader.jsx";

const baseurl = import.meta.env.VITE_BASE_URL;

const MyTasks = () => {
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();

  const getEntityId = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value._id || value.id || "";
  };

  const { isLoading, error, data: tasks } = useQuery({
    queryKey: ["userTasks", userid],
    queryFn: async () => {
      const res = await axios.get(`${baseurl}/api/task/user`, {
        withCredentials: true,
      });
      return res.data.tasks || [];
    },
    enabled: !!userid,
  });

  if (isLoading) return <Loader />;
  if (error) return <h3 className="text-red-500 text-center mt-10">Failed to load tasks 😕</h3>;

  const getStatusConfig = (status, task) => {
    switch (status) {
      case "completed":
        return { label: "Completed", color: "bg-green-100 text-green-700 border-green-200" };
      case "in_progress":
        return {
          label: "In Progress",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          startDate: task?.startedAt,
          endDate: task?.endsAt,
        };
      case "waiting_for_payment":
        return { label: "Pending Payment", color: "bg-yellow-100 text-yellow-700 border-yellow-200" };
      case "expired":
        return { label: "Expired", color: "bg-red-100 text-red-700 border-red-200" };
      default:
        return { label: "Unknown status", color: "bg-gray-100 text-gray-700 border-gray-200" };
    }
  };

  const formatTaskDate = (dateValue) => {
    if (!dateValue) return "Not available";
    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) return "Not available";
    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysLeftLabel = (endDateValue) => {
    if (!endDateValue) return "Not available";
    const endDate = new Date(endDateValue);
    if (Number.isNaN(endDate.getTime())) return "Not available";

    const now = new Date();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const diffMs = endDate.getTime() - now.getTime();

    if (diffMs < 0) {
      const overdueDays = Math.ceil(Math.abs(diffMs) / oneDayMs);
      return `Overdue by ${overdueDays} day${overdueDays === 1 ? "" : "s"}`;
    }

    const daysLeft = Math.ceil(diffMs / oneDayMs);
    if (daysLeft === 0) return "Ends today";
    return `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <button
          onClick={() => navigate("/friendlist")}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          + New Group Task
        </button>
      </div>

      {!tasks || tasks.length === 0 ? (
        <div className="text-center bg-gray-50 border border-gray-200 rounded-2xl py-16">
          <p className="text-gray-500 mb-4">You have no tasks yet.</p>
          <button
            onClick={() => navigate("/friendlist")}
            className="text-red-600 font-medium hover:underline"
          >
            Create one now →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => {
            const statusConfig = getStatusConfig(task.status, task);
            const isCreator = String(task.createdBy?._id) === String(userid);
            const creatorName = task.createdBy?.name || task.createdBy?.username || "A Friend";
            const unpaidUsers = (task.payments || [])
              .filter((payment) => payment?.hasPaid === false)
              .map((payment) => {
                const paymentUserId = String(getEntityId(payment.user));
                const participant = (task.participants || []).find(
                  (p) => String(getEntityId(p)) === paymentUserId
                );

                if (paymentUserId === String(userid)) return "You";
                return participant?.username
                  ? `@${participant.username}`
                  : participant?.name || "Unknown user";
              });

            return (
              <div
                key={task._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 break-words">
                      {task.title}
                    </h2>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusConfig.color}`}
                    >
                      {statusConfig.label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-3 min-h-[40px]">
                    {task.description || "No description provided."}
                  </p>

                  <div className="mb-3 space-y-1 text-xs text-gray-600">
                    <p>
                      <span className="font-medium text-gray-700">Start Date:</span>{" "}
                      {formatTaskDate(task.startedAt)}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">End Date:</span>{" "}
                      {formatTaskDate(task.endsAt)}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Days Left:</span>{" "}
                      {getDaysLeftLabel(task.endsAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      ⏱ {task.duration} days
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                      👑 {isCreator ? "You Created" : `By ${creatorName}`}
                    </span>

                  </div>

                  {task.status === "waiting_for_payment" && unpaidUsers.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-yellow-700 mb-2">Pending Payment From:</p>
                      <div className="flex flex-wrap gap-2">
                        {unpaidUsers.map((userLabel, index) => (
                          <span
                            key={`${task._id}-pending-${index}`}
                            className="text-xs px-2 py-1 rounded-md bg-yellow-100 text-yellow-800 border border-yellow-200"
                          >
                            {userLabel}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mt-auto">
                  <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
                    Participants ({task.participants?.length || 0})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {task.participants?.map((participant) => (
                      <span
                        key={participant._id}
                        className="text-xs px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                        title={participant.name || participant.username}
                      >
                        @{participant.username}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTasks;
