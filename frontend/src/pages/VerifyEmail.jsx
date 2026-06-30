const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#7a0019] px-8 py-8 text-center">
            <div className="mx-auto h-14 w-14 bg-white rounded-xl flex items-center justify-center shadow-lg mb-3">
              <span className="text-[#7a0019] font-bold text-xl">M</span>
            </div>
            <h2 className="text-xl font-bold text-white">Verify Your Email</h2>
            <p className="mt-1 text-[#ffcc33] text-xs font-semibold uppercase tracking-wider">Gopher Events</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8 text-center">
            
            <p className="text-gray-600 text-sm mb-6">
              We sent a 6-digit code to <span className="font-semibold text-gray-900">yourname@umn.edu</span>
            </p>

            <form className="space-y-6">
              
              {/* 6 Digit OTP Inputs */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <input
                    key={num}
                    name={`otp-${num}`}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]"
                    placeholder="•"
                    className="w-12 h-14 text-center text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a0019] focus:border-[#7a0019] focus:bg-white transition-colors"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg text-sm font-bold text-white bg-[#7a0019] hover:bg-[#5a0012] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a0019] transition-colors"
              >
                Verify Email
              </button>

            </form>

            {/* Resend */}
            <p className="mt-6 text-sm text-gray-500">
              Did not receive it?{' '}
              <button type="button" className="font-medium text-[#7a0019] hover:text-[#5a0012] transition-colors">
                Resend code
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;