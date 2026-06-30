/*
We get everything in the props
sent as this!
    {
        type: "Sucess",
        message: "welcome back gopher!"
    }
*/

const GopherMessage = ({ type, message }) => {
  const isSuccess = type === 'success';
  const isError = type === 'error';
  const isInfo = type === 'info';

  const bgColor = isSuccess ? 'bg-green-50' : isError ? 'bg-red-50' : 'bg-amber-50';
  const borderColor = isSuccess ? 'border-green-200' : isError ? 'border-red-200' : 'border-amber-200';
  const circleColor = isSuccess ? 'bg-green-100' : isError ? 'bg-red-100' : 'bg-amber-100';
  const textColor = isSuccess ? 'text-green-700' : isError ? 'text-red-700' : 'text-amber-800';

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${bgColor} ${borderColor}`}>
      
      {/* Gopher Face */}
      <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center ${circleColor}`}>
        <svg viewBox="0 0 100 100" className="h-7 w-7">
          <circle cx="20" cy="35" r="12" fill="#8B6914" />
          <circle cx="80" cy="35" r="12" fill="#8B6914" />
          <ellipse cx="50" cy="55" rx="35" ry="30" fill="#C19A6B" />
          <ellipse cx="50" cy="62" rx="18" ry="14" fill="#D4B896" />
          <circle cx="50" cy="56" r="5" fill="#3E2723" />
          <circle cx="38" cy="48" r="4" fill="#3E2723" />
          <circle cx="62" cy="48" r="4" fill="#3E2723" />
          
          {isSuccess ? (
            <>
              <path d="M 42 68 Q 50 76 58 68" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <rect x="46" y="68" width="8" height="6" rx="1" fill="white" stroke="#3E2723" strokeWidth="1" />
            </>
          ) : isError ? (
            <>
              <path d="M 42 72 Q 50 66 58 72" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="34" cy="52" r="2" fill="#60A5FA" />
            </>
          ) : (
            <>
              {/* Neutral straight mouth + curious eye sparkle */}
              <line x1="42" y1="70" x2="58" y2="70" stroke="#3E2723" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="66" cy="45" r="1.5" fill="white" />
            </>
          )}
        </svg>
      </div>

      <p className={`text-sm font-medium ${textColor}`}>
        {message}
      </p>
    </div>
  );
};

export default GopherMessage;