import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 text-gray-900 px-6">
      <div className="text-center max-w-xl bg-white p-12 rounded-2xl shadow-sm border border-gray-200">
        
        {/* 404 */}
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
           <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed text-sm">
          The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back on track.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block rounded-lg bg-blue-600 px-8 py-2.5 
                     text-white font-medium transition-all duration-200
                     hover:bg-blue-700 shadow-sm hover:shadow"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
