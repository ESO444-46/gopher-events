const EventHero = ({title}) => {
  return (
    <div className="relative h-72 sm:h-96 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-[#7a0019] via-[#a33c2d] to-[#ffcc33]" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
     {/* 
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
        <button className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events *
        </button>
        
        <button className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share *
        </button>
      </div> */}
      
      {/* Title */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Upcoming
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EventHero;