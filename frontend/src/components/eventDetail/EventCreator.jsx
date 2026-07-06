const EventCreator = ({firstName,lastName}) => {
  return (
    <div>
      <h2 className="font-sans text-xl font-bold text-ink mb-4">Organized by</h2>
      <div className="pt-4"></div>


      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-maroon to-gold flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">{`${firstName[0]}${lastName[0]}`}</span>
        </div>
        <div>
          <p className="font-semibold text-ink">{`${firstName} ${lastName}`}</p>
          <p className="text-ink-soft text-sm">Event Organizer</p>
        </div>
      </div>
    </div>
  );
};

export default EventCreator;