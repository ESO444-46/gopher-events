import { useRef } from "react";

const VerifyEmail = () => {
  const inputsRef = useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      e.target.value = value.replace(/\D/g, '');
      return;
    }

    // Move to next input if filled
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace on empty input → move to previous
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    pasteData.split('').forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = digit;
      }
    });

    // Focus last filled input or first empty
    const focusIndex = Math.min(pasteData.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

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
              <div className="flex justify-center gap-2" onPaste={handlePaste}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    name={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]"
                    placeholder="•"
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
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