import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PayButton from "../components/payments/paybutton.jsx";

const baseurl = import.meta.env.VITE_BASE_URL;

const PendingTasks = () => {
  const userid = localStorage.getItem("userid");

  const getEntityId = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value._id || value.id || "";
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["userTasks", userid],
    queryFn: async () => {
      const res = await axios.get(`${baseurl}/api/task/user`, {
        withCredentials: true,
      });
      return res.data.tasks || [];
    },
    enabled: !!userid,
  });

  if (isLoading || error || !data) return null;

  const pendingTasks = data.filter((t) => t.status === "waiting_for_payment");

  if (pendingTasks.length === 0) return null;

  return (
    <section className="mb-6 space-y-4">
      {pendingTasks.map((task) => {
        const amountValue = task.duration ? Number(task.duration) * 10 : 25;
        const isCreator = String(task.createdBy._id) === String(userid);
        const creatorName = task.createdBy?.name || task.createdBy?.username || "A connection";
        
        const myPaymentEntry = (task.payments || []).find(
          (p) => String(getEntityId(p?.user)) === String(userid)
        );
        const hasCurrentUserPaid = myPaymentEntry?.hasPaid === true;
        
        const unpaidUsers = (task.payments || [])
          .filter((payment) => payment?.hasPaid === false)
          .map((payment) => {
            const paymentUserId = String(getEntityId(payment.user));
            const participant = (task.participants || []).find(
              (p) => String(getEntityId(p)) === paymentUserId
            );
            if (paymentUserId === String(userid)) return "You";
            return participant?.username ? `@${participant.username}` : participant?.name || "Unknown user";
          });

        return (
          <div
            key={task._id}
            className="flex flex-col md:flex-row items-center justify-between border-l-4 border-amber-500 bg-amber-50/50 border border-y-amber-200 border-r-amber-200 p-5 rounded-r-2xl shadow-sm gap-6"
          >
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-1.5">
                 <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
                 <h2 className="text-base font-semibold text-gray-900">
                   Action Required: Task Payment
                 </h2>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed">
                {isCreator ? "You created the task " : `${creatorName} invited you to the task `}
                <span className="font-semibold text-gray-900">"{task.title}"</span>. 
                {hasCurrentUserPaid ? (
                  <span className="font-medium text-emerald-700 ml-1">Your payment is complete. Waiting for others.</span>
                ) : (
                  <>
                    {" "}Please pay your share of <span className="font-semibold text-amber-700">₹{amountValue}</span> to activate the task.
                  </>
                )}
              </p>
              
              {task.description && (
                <p className="text-sm text-gray-500 mt-2 italic bg-white/50 px-3 py-2 rounded-lg border border-amber-100/50">"{task.description}"</p>
              )}
              
              {unpaidUsers.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Pending from:</p>
                  {unpaidUsers.map((userLabel, index) => (
                    <span
                      key={`${task._id}-unpaid-${index}`}
                      className="text-xs px-2.5 py-1 rounded-md bg-white border border-amber-200 text-amber-700 shadow-sm"
                    >
                      {userLabel}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {!hasCurrentUserPaid && (
              <div className="shrink-0 w-full md:w-auto bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden min-w-[280px]">
                {/* PayButton is injected here - scaling it slightly down to fit banner format nicely */}
                <div className="transform scale-90 origin-center -my-4">
                   <PayButton amountvalue={amountValue} taskId={task._id} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default PendingTasks;
