import React from "react";

const Home = () => {
  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Welcome + Primary Action */}
        <section className="bg-white border border-gray-200 rounded-2xl p-8 
                            shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Ready to focus and study smarter today?
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-red-600 text-white rounded-xl 
                               font-medium hover:bg-red-700 transition">
              Start Study Session
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-xl 
                               hover:border-red-600 hover:text-red-600 transition">
              Open Pomodoro
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-xl 
                               hover:border-red-600 hover:text-red-600 transition">
              Relax Mode
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Focus Time Today", value: "1h 45m" },
            { label: "Sessions Completed", value: "4" },
            { label: "Study Streak", value: "6 Days" },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-gray-200 rounded-2xl p-6 
                         shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* Main Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Friends Activity */}
          <div className="lg:col-span-2 border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Friends Activity
            </h2>

            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex justify-between">
                <span>Aman started a Pomodoro</span>
                <span className="text-gray-400">25 min</span>
              </li>
              <li className="flex justify-between">
                <span>Neha completed a session</span>
                <span className="text-gray-400">50 min</span>
              </li>
              <li className="flex justify-between">
                <span>Reminder sent to Rahul</span>
                <span className="text-gray-400">Today</span>
              </li>
            </ul>
          </div>

          {/* Friend Requests */}
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Friend Requests
            </h2>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">@ankit_23</span>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-red-600 text-white 
                                   rounded-lg text-sm">
                  Accept
                </button>
                <button className="px-4 py-1.5 border border-gray-300 
                                   rounded-lg text-sm">
                  Reject
                </button>
              </div>
            </div>
          </div>

        </section>

        {/* Bottom Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Pomodoro */}
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Pomodoro Timer
            </h2>
            <p className="text-4xl font-semibold text-red-600 mt-3">
              25:00
            </p>
            <button className="mt-5 px-6 py-2.5 bg-red-600 text-white 
                               rounded-xl hover:bg-red-700 transition">
              Start Focus
            </button>
          </div>

          {/* Notes */}
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Continue Notes
            </h2>
            <p className="text-sm text-gray-600 mt-3 line-clamp-4">
              Revise DBMS normalization, focus on 3NF and BCNF examples.
              Prepare quick notes for exam revision.
            </p>
            <button className="mt-4 text-red-600 font-medium text-sm">
              Open Notes →
            </button>
          </div>

        </section>

      </div>
    </main>
  );
};

export default Home;
