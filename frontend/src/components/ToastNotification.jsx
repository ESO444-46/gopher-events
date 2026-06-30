const Toast = ({ type, message }) => {
  const isSuccess = type === 'success';
  const isError = type === 'error';
  const isInfo = type === 'info';

  const bgColor = isSuccess ? 'bg-green-50' : isError ? 'bg-red-50' : 'bg-amber-50';
  const borderColor = isSuccess ? 'border-green-200' : isError ? 'border-red-200' : 'border-amber-200';
  const textColor = isSuccess ? 'text-green-800' : isError ? 'text-red-800' : 'text-amber-800';
  const iconColor = isSuccess ? 'text-green-500' : isError ? 'text-red-500' : 'text-amber-500';

  return (
    
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColor} ${borderColor} animate-[slideIn_0.3s_ease-out]`}>
      
      {/* Icon */}
      <div className={`flex-shrink-0 ${iconColor}`}>
        {isSuccess ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : isError ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>

      {/* Message */}
      <p className={`text-sm font-medium ${textColor}`}>
        {message}
      </p>
    </div>
  );
};

export default Toast;