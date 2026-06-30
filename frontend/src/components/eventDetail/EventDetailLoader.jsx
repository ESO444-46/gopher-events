const EventDetailLoader = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      
      {/* Spinning Goldy */}
      <div className="relative">
        <div className="animate-spin h-20 w-20">
          <svg viewBox="0 0 100 100" className="h-20 w-20">
            <circle cx="20" cy="35" r="12" fill="#8B6914" />
            <circle cx="80" cy="35" r="12" fill="#8B6914" />
            <ellipse cx="50" cy="55" rx="35" ry="30" fill="#C19A6B" />
            <ellipse cx="50" cy="62" rx="18" ry="14" fill="#D4B896" />
            <circle cx="50" cy="56" r="5" fill="#3E2723" />
            <circle cx="38" cy="48" r="4" fill="#3E2723" />
            <circle cx="62" cy="48" r="4" fill="#3E2723" />
            <path d="M 42 68 Q 50 76 58 68" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <rect x="46" y="68" width="8" height="6" rx="1" fill="white" stroke="#3E2723" strokeWidth="1" />
          </svg>
        </div>
        
        {/* Sparkle dots */}
        <div className="absolute -top-2 -right-2 animate-ping">
          <div className="h-2 w-2 rounded-full bg-[#ffcc33]" />
        </div>
        <div className="absolute -bottom-1 -left-3 animate-ping delay-150">
          <div className="h-1.5 w-1.5 rounded-full bg-[#7a0019]" />
        </div>
      </div>
      
      {/* Text */}
      <p className="mt-6 text-gray-500 text-sm font-medium animate-pulse">
        Loading event...
      </p>
    </div>
  );
};

export default EventDetailLoader;