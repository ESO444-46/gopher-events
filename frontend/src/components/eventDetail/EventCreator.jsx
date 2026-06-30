const EventCreator = ({firstName,lastName}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Organized by</h2>
      
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#7a0019] to-[#ffcc33] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">{`${firstName[0]}${lastName[0]}`}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{`${firstName} ${lastName}`}</p>
          <p className="text-gray-500 text-sm">Event Organizer</p>
        </div>
      </div>
    </div>
  );
};

export default EventCreator;