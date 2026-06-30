const EventDescription = ({description}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">About this event</h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        {description}
      </div>
    </div>
  );
};

export default EventDescription;