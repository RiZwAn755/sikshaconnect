import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/utils/loader.jsx";
import PayButton from "../components/payments/paybutton.jsx";
import { useState } from "react";

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

  if (isLoading) return null; // Silently load on home page

  if (error || !data) return null;

  // Show all tasks that are still waiting for payment so users can see who is pending.
  const pendingTasks = data.filter((t) => {
    return t.status === "waiting_for_payment";
  });

  if (pendingTasks.length === 0) return null;

  return (
    <section className="mb-6 space-y-4">
      {pendingTasks.map((task) => {
        // Calculate amount to pay based on duration * 10 or default 25
        const amountValue = task.duration ? Number(task.duration) * 10 : 25;
        // Check if the user is the creator
        const isCreator = String(task.createdBy._id) === String(userid);
        // Find creator details
        const creatorName = task.createdBy?.name || task.createdBy?.username || "A friend";
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

            if (paymentUserId === String(userid)) {
              return "You";
            }

            return participant?.username
              ? `@${participant.username}`
              : participant?.name || "Unknown user";
          });

        return (
          <div
            key={task._id}
            className="flex flex-col sm:flex-row items-center justify-between border-l-4 border-red-500 bg-red-50 p-4 rounded-r-2xl shadow-sm gap-4"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                ⚠️ Action Required: Group Task Payment
              </h2>
              <p className="text-sm text-gray-700 mt-1">
                {isCreator 
                  ? "You created the task " 
                  : `${creatorName} invited you to the group task `}
                <span className="font-semibold text-black">"{task.title}"</span>. 
                {hasCurrentUserPaid ? (
                  <span className="font-semibold text-green-700"> Your payment is done. Waiting for others.</span>
                ) : (
                  <>
                    Please pay your share of <span className="font-semibold text-red-600">₹{amountValue}</span> to proceed.
                  </>
                )}
              </p>
              {task.description && (
                <p className="text-xs text-gray-500 mt-1 italic">"{task.description}"</p>
              )}
              {unpaidUsers.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-semibold text-red-700">Pending from:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {unpaidUsers.map((userLabel, index) => (
                      <span
                        key={`${task._id}-unpaid-${index}`}
                        className="text-xs px-2 py-1 rounded-md bg-red-100 text-red-800 border border-red-200"
                      >
                        {userLabel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex shrink-0 -mt-8">
              {/* PayButton normally renders its own huge card, so we might need a custom inline button here if PayButton is bulky.
                  Wait, PayButton returns `<div className="w-full flex justify-center...">...</div>` 
                  It's a huge component. Let's reuse it anyway, but wait, it will look massive inside a small banner list!
                  For now, we'll just embed it and the user can refactor PayButton if it's too big.
              */}
              {!hasCurrentUserPaid && (
                <div className="scale-75 origin-right">
                  <PayButton amountvalue={amountValue} taskId={task._id} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default PendingTasks;
