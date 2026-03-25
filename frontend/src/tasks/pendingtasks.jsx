import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/utils/loader.jsx";
import PayButton from "../components/payments/paybutton.jsx";
import { useState } from "react";

const baseurl = import.meta.env.VITE_BASE_URL;

const PendingTasks = () => {
  const userid = localStorage.getItem("userid");

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

  // Filter tasks where status is waiting_for_payment and current user hasn't paid
  const pendingTasks = data.filter((t) => {
    if (t.status !== "waiting_for_payment") return false;

    const myPaymentEntry = t.payments?.find(
      (p) => String(p.user) === String(userid)
    );
    
    return myPaymentEntry && myPaymentEntry.hasPaid === false;
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
                Please pay your share of <span className="font-semibold text-red-600">₹{amountValue}</span> to proceed.
              </p>
              {task.description && (
                <p className="text-xs text-gray-500 mt-1 italic">"{task.description}"</p>
              )}
            </div>

            <div className="flex shrink-0 -mt-8">
              {/* PayButton normally renders its own huge card, so we might need a custom inline button here if PayButton is bulky.
                  Wait, PayButton returns `<div className="w-full flex justify-center...">...</div>` 
                  It's a huge component. Let's reuse it anyway, but wait, it will look massive inside a small banner list!
                  For now, we'll just embed it and the user can refactor PayButton if it's too big.
              */}
              <div className="scale-75 origin-right">
                <PayButton amountvalue={amountValue} taskId={task._id} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default PendingTasks;
