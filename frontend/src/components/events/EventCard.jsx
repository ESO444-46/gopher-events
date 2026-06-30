const EventCard = ({ title, venue, startsAt, endsAt, imageUrl }) => {
  
  const start = new Date(startsAt);
  const end = new Date(endsAt);

  const fmtTime = (d) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const fmtDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const isSameDay = start.toDateString() === end.toDateString();

  const timeDisplay = isSameDay
    ? `${fmtDate(start)} • ${fmtTime(start)} — ${fmtTime(end)}`
    : `${fmtDate(start)}, ${fmtTime(start)} — ${fmtDate(end)}, ${fmtTime(end)}`;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      
      <div className="aspect-square w-full relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#7a0019] to-[#ffcc33] flex items-center justify-center">
            <span className="text-white/90 font-bold text-4xl">M</span>
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">{title}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{venue}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{timeDisplay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard