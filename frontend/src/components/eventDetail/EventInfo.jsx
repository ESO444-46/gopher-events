const EventInfo = () => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-5 border border-gray-100">
      
      <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Event Details</h3>
      
      {/* Date & Time */}
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#7a0019]/10 flex items-center justify-center flex-shrink-0">
          <svg className="h-5 w-5 text-[#7a0019]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">Jan 20 — Jan 21, 2026</p>
          <p className="text-gray-500 text-sm">9:00 AM — 9:00 AM</p>
          <p className="text-gray-400 text-xs mt-0.5">24 hours</p>
        </div>
      </div>

      {/* Venue */}
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#7a0019]/10 flex items-center justify-center flex-shrink-0">
          <svg className="h-5 w-5 text-[#7a0019]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">Coffman Memorial Union</p>
          <p className="text-gray-500 text-sm">300 Washington Ave SE</p>
          <p className="text-gray-400 text-xs mt-0.5">Minneapolis, MN 55455</p>
        </div>
      </div>

    </div>
  );
};

export default EventInfo;