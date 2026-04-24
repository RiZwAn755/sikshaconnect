import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/utils/loader.jsx";

const baseurl = import.meta.env.VITE_BASE_URL;

const MyTasks = () => {
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const contributeMutation = useMutation({
    mutationFn: async (taskId) => {
      await axios.put(`${baseurl}/api/task/contribute/${taskId}`, {}, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userTasks", userid] });
    },
    onError: (err) => {
      const apiMessage = err?.response?.data?.message;
      alert(apiMessage || "Failed to contribute to task");
    },
  });

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["userTasks", userid] });
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, [queryClient, userid]);

  if (isLoading) return <Loader />;
  if (error) return <h3 className="text-red-500 text-center mt-10 font-medium">Failed to load tasks 😕</h3>;

  const getStatusConfig = (status, task) => {
    switch (status) {
      case "completed":
        return { label: "Completed", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "in_progress":
        return {
          label: "In Progress",
          color: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "waiting_for_payment":
        return { label: "Pending Payment", color: "bg-amber-50 text-amber-700 border-amber-200" };
      case "expired":
        return { label: "Expired", color: "bg-red-50 text-red-700 border-red-200" };
      default:
        return { label: "Unknown status", color: "bg-gray-50 text-gray-700 border-gray-200" };
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

  const getStreakWindowLabel = (lastUpdatedAtValue) => {
    if (!lastUpdatedAtValue) return "Starts after first complete cycle";

    const lastUpdatedAt = new Date(lastUpdatedAtValue);
    if (Number.isNaN(lastUpdatedAt.getTime())) return "Time not available";

    const now = new Date();
    const windowMs = 24 * 60 * 60 * 1000;
    const elapsedMs = now.getTime() - lastUpdatedAt.getTime();

    if (elapsedMs >= windowMs) return "Window passed - next cycle resets streak";

    const remainingHours = Math.ceil((windowMs - elapsedMs) / (60 * 60 * 1000));
    return `${remainingHours}h left in window`;
  };

  const getEffectiveStatus = (task) => {
    const endDate = task?.endsAt ? new Date(task.endsAt) : null;
    const isOverdueByDate =
      task?.status === "in_progress" &&
      endDate &&
      !Number.isNaN(endDate.getTime()) &&
      endDate.getTime() < Date.now();

    return isOverdueByDate ? "expired" : task?.status;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">My Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your active study tasks.</p>
        </div>
        <button
          onClick={() => navigate("/friendlist")}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm font-medium text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          New Task
        </button>
      </div>

      {/* Empty State */}
      {!tasks || tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm">
           <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
             <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
           </div>
           <p className="text-gray-900 font-semibold text-lg">No tasks found</p>
           <p className="text-gray-500 text-sm mt-1 max-w-sm text-center">You haven't created or joined any tasks yet. Create one to get started.</p>
           <button
             onClick={() => navigate("/friendlist")}
             className="mt-6 text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
           >
             Create a task <span aria-hidden="true">&rarr;</span>
           </button>
        </div>
      ) : (
        /* Tasks Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => {
            const effectiveStatus = getEffectiveStatus(task);
            const statusConfig = getStatusConfig(effectiveStatus, task);
            const isCreator = String(task.createdBy?._id) === String(userid);
            const creatorName = task.createdBy?.name || task.createdBy?.username || "A Friend";
            
            const myContributionEntry = (task.contribution || []).find(
              (entry) => String(getEntityId(entry?.user)) === String(userid)
            );
            const hasContributedToday = myContributionEntry?.hasContributed === true;
            const canContribute = effectiveStatus === "in_progress" && !hasContributedToday;
            const isContributingThisTask = contributeMutation.isPending && contributeMutation.variables === task._id;
            
            const maxStreak = Number(task?.maxStreak ?? task?.streak?.count ?? 0);
            const totalDays = Number(task?.duration ?? 0);
            const derivedExpiredPercent = totalDays > 0 ? Math.min(100, Math.max(0, (maxStreak / totalDays) * 100)) : 0;
            const expiredPercent = Number(task?.expiredMeta?.maxStreakPercent ?? task?.expiredMeta?.lastStreakPercent ?? derivedExpiredPercent);
            
            const investedAmount = Number(task?.expiredMeta?.investedAmount ?? 0);
            const collectableAmount = Number(task?.expiredMeta?.collectableAmount ?? (investedAmount * expiredPercent) / 100);
            
            const unpaidUsers = (task.payments || [])
              .filter((payment) => payment?.hasPaid === false)
              .map((payment) => {
                const paymentUserId = String(getEntityId(payment.user));
                const participant = (task.participants || []).find(
                  (p) => String(getEntityId(p)) === paymentUserId
                );
                if (paymentUserId === String(userid)) return "You";
                return participant?.username ? `@${participant.username}` : participant?.name || "Unknown";
              });

            return (
              <div
                key={task._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col h-full relative overflow-hidden"
              >
                {/* Decorative top accent line based on status */}
                <div className={`absolute top-0 left-0 w-full h-1 ${
                    effectiveStatus === 'completed' ? 'bg-emerald-500' :
                    effectiveStatus === 'in_progress' ? 'bg-blue-500' :
                    effectiveStatus === 'waiting_for_payment' ? 'bg-amber-500' : 'bg-red-500'
                }`}></div>

                <div className="flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
                      {task.title}
                    </h2>
                    <span className={`shrink-0 px-2.5 py-1 text-xs font-semibold rounded-md border ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-5 line-clamp-2 min-h-[40px] leading-relaxed">
                    {task.description || <span className="italic opacity-70">No description provided</span>}
                  </p>

                  {/* Core Info Grid */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-5">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Start Date</p>
                      <p className="text-sm font-medium text-gray-900">{formatTaskDate(task.startedAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">End Date</p>
                      <p className="text-sm font-medium text-gray-900">{formatTaskDate(task.endsAt)}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Time Remaining</p>
                      <p className="text-sm font-medium text-gray-900">{getDaysLeftLabel(task.endsAt)}</p>
                    </div>
                  </div>

                  {/* Streak Block */}
                  <div className="mb-5 rounded-xl border border-orange-100 bg-orange-50/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                       <p className="text-sm font-bold text-orange-800 flex items-center gap-1.5">
                         🔥 Streak: {Number(task.streak?.count) || 0}
                       </p>
                       <span className="text-xs font-medium bg-orange-100 text-orange-800 px-2 py-0.5 rounded">
                         {task.duration} days total
                       </span>
                    </div>
                    <p className="text-xs text-orange-700/80 font-medium">
                      Updated: {formatTaskDate(task.streak?.lastUpdatedAt)}
                    </p>
                    <p className="text-xs text-orange-700/80 font-medium mt-0.5">
                      {getStreakWindowLabel(task.streak?.lastUpdatedAt)}
                    </p>
                  </div>

                  {/* Payment Warnings */}
                  {effectiveStatus === "waiting_for_payment" && unpaidUsers.length > 0 && (
                    <div className="mb-5 border border-amber-200 bg-amber-50 rounded-xl p-4">
                      <p className="text-xs font-bold text-amber-800 mb-2 uppercase tracking-wider">Pending Payment From</p>
                      <div className="flex flex-wrap gap-1.5">
                        {unpaidUsers.map((userLabel, index) => (
                          <span
                            key={`${task._id}-pending-${index}`}
                            className="text-xs px-2 py-1 rounded bg-white border border-amber-200 text-amber-700 font-medium shadow-sm"
                          >
                            {userLabel}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {effectiveStatus === "expired" && (
                    <div className="mb-5 border border-red-200 bg-red-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-red-800 leading-relaxed">
                        Task expired. You can collect <span className="font-bold">{expiredPercent.toFixed(1)}%</span> of your investment by contacting admin.
                      </p>
                      <p className="text-sm font-bold text-red-700 mt-2">
                        Collectable: ₹{collectableAmount.toFixed(2)}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto pt-2">
                      {effectiveStatus === "in_progress" && (
                        <button
                          onClick={() => contributeMutation.mutate(task._id)}
                          disabled={!canContribute || isContributingThisTask}
                          className={`w-full rounded-lg px-4 py-2.5 text-sm font-bold transition shadow-sm ${
                            canContribute
                              ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow"
                              : "bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200"
                          }`}
                        >
                          {isContributingThisTask
                            ? "Submitting..."
                            : hasContributedToday
                            ? "✓ Contribution Logged"
                            : "Log Daily Contribution"}
                        </button>
                      )}
                  </div>
                </div>

                {/* Footer section */}
                <div className="border-t border-gray-100 mt-5 pt-4 bg-gray-50/50 -mx-6 -mb-6 px-6 pb-6">
                  <div className="flex items-center justify-between mb-3">
                     <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                       Participants ({task.participants?.length || 0})
                     </p>
                     <span className="text-xs font-medium text-gray-500 capitalize">
                        {isCreator ? "Created by You" : `By ${creatorName}`}
                     </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {task.participants?.map((participant) => (
                      <span
                        key={participant._id}
                        className="text-xs px-2.5 py-1 bg-white border border-gray-200 rounded-md text-gray-700 font-medium shadow-sm"
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
