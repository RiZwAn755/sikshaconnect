import React from "react";
import PendingTasks from "../../tasks/pendingtasks.jsx";

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 sm:px-6 py-8 pb-20">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Pending Tasks Banner */}
        <PendingTasks />

        {/* Welcome Section */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Welcome back 👋
            </h1>
            <p className="text-gray-500 mt-1.5 text-sm sm:text-base max-w-md">
              Ready to focus and study smarter today? Track your tasks and connect with peers.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm hover:shadow">
                Start Study Session
              </button>
              <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm">
                Open Pomodoro
              </button>
            </div>
          </div>
          {/* Decorative background shape */}
          <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: "Focus Time Today", value: "1h 45m", color: "text-blue-600" },
            { label: "Sessions Completed", value: "4", color: "text-emerald-600" },
            { label: "Study Streak", value: "6 Days", color: "text-orange-600" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.label}</p>
              <p className={`text-2xl font-bold mt-2 ${item.color}`}>
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* Main Grid Two Columns */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Activity Feed */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
            <h2 className="text-base font-semibold text-gray-900 mb-5">
              Recent Activity
            </h2>

            <ul className="space-y-4 flex-1">
              {[
                { name: "Aman", action: "started a Pomodoro", time: "25 min", dot: "bg-blue-500" },
                { name: "Neha", action: "completed a session", time: "50 min", dot: "bg-emerald-500" },
                { name: "Rahul", action: "joined a new study group", time: "2 hrs ago", dot: "bg-violet-500" },
              ].map((activity, i) => (
                <li key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                   <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${activity.dot}`}></div>
                   <div className="flex-1">
                     <p className="text-sm text-gray-800">
                       <span className="font-semibold text-gray-900">{activity.name}</span> {activity.action}
                     </p>
                   </div>
                   <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                     {activity.time}
                   </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Tools */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6 h-full">
            
            <div className="flex-1 bg-slate-50 rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Pomodoro Timer</h3>
              <p className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">25:00</p>
              <button className="w-full py-2 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                Start Timer
              </button>
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Active Note</h3>
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100/50">
                 <p className="text-xs text-yellow-800 line-clamp-3 leading-relaxed">
                   Revise DBMS normalization, focus on 3NF and BCNF examples. Prepare quick notes for tomorrow's revision.
                 </p>
                 <button className="mt-3 text-xs font-semibold text-yellow-700 hover:text-yellow-900 flex items-center gap-1">
                   Continue reading <span aria-hidden="true">&rarr;</span>
                 </button>
              </div>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Home;
