export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center max-w-xl">
        
        {/* 404 */}
        <h1 className="text-[8rem] md:text-[10rem] font-extrabold tracking-tight text-red-600 animate-pulse">
          404
        </h1>

        {/* Divider */}
        <div className="mx-auto my-4 h-1 w-20 bg-red-600 rounded-full" />

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back on track.
        </p>

        {/* Button */}
        <a
          href="/"
          className="inline-block rounded-lg border border-red-600 px-8 py-3 
                     text-red-600 font-medium transition-all duration-300
                     hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/30"
        >
          Go Back Home
        </a>

        {/* Floating accent */}
        <div className="relative mt-12">
          <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full animate-bounce" />
        </div>

      </div>
    </div>
  );
}
