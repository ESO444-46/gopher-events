const EventDescription = ({description}) => {
  return (
    <div className="space-y-4">
      <h2 className="font-sans text-xl font-bold text-ink">About this event</h2>
      <div className="space-y-4 text-ink-soft leading-relaxed">
        {description}
      </div>
    </div>
  );
};

export default EventDescription;