import React, { useState } from 'react';

const PasswordRoaster = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Default State
  const [feedback, setFeedback] = useState({
    message: "Ready to analyze",
    subtext: "Enter a password to check its strength and get helpful tips",
    level: "NEUTRAL",
    color: "text-slate-500"
  });

  const evaluatePassword = (val) => {
    if (val.length === 0) {
      return {
        message: "Ready to analyze",
        subtext: "Enter a password to check its strength and get helpful tips",
        level: "NEUTRAL",
        color: "text-slate-500"
      };
    }

    const common = ["12345", "password", "qwerty", "admin", "12345678", "letmein", "welcome"];
    if (common.includes(val.toLowerCase())) {
      return {
        message: "Very Weak Password",
        subtext: "This password is commonly used and easily guessable. Please choose something more unique.",
        level: "DANGER",
        color: "text-red-600"
      };
    }

    if (val.length < 6) {
      return {
        message: "Too Short",
        subtext: "Passwords should be at least 6 characters long for basic security.",
        level: "WARNING",
        color: "text-orange-600"
      };
    }

    const hasUpper = /[A-Z]/.test(val);
    const hasNum = /[0-9]/.test(val);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    if (!hasUpper && !hasNum && !hasSpecial) {
      return {
        message: "Needs More Variety",
        subtext: "Add uppercase letters, numbers, or special characters to make it stronger.",
        level: "WARNING",
        color: "text-orange-600"
      };
    }

    if (val.length >= 12 && hasUpper && hasNum && hasSpecial) {
      return {
        message: "Excellent Password!",
        subtext: "Your password meets all security requirements. Great job!",
        level: "SECURE",
        color: "text-green-600"
      };
    }

    return {
      message: "Good Password",
      subtext: "This is acceptable, but consider making it longer for maximum security.",
      level: "OK",
      color: "text-blue-600"
    };
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setFeedback(evaluatePassword(val));
  };

  const handleShare = () => {
    const text = `Password Strength Check: ${feedback.message} - ${feedback.subtext}`;
    navigator.clipboard.writeText(text);
    alert("Result copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#a9d2b8]">
      <div className="w-full max-w-lg mx-auto ">
        {/* Main Card */}
        <div className="bg-[#242424] rounded-2xl shadow-[6px_6px_0_#242424] border-4 border-[#242424] overflow-hidden">
          {/* Header */}
          <div className="bg-[#242424] p-6 text-white">
            <div className="text-center">
              <h1 className="text-2xl text-[#fff7e4] sm:text-3xl font-bold mb-2">Password Strength</h1>
              <p className="text-[#f5edda] text-sm sm:text-base">Get honest feedback about your password</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6 bg-[#fff7e4]">
            {/* Password Input */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#242424] block">
                Enter your password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange}
                  placeholder="Type your password here..."
                  className="w-full px-4 py-4 bg-[#fff7e4] border-2 border-[#242424] rounded-xl text-[#242424] placeholder-[#242424] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-base"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Strength Indicator */}
            {/* {password && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Password Strength</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      feedback.level === 'SECURE' ? 'bg-green-500' :
                      feedback.level === 'OK' ? 'bg-blue-500' :
                      feedback.level === 'WARNING' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className={`text-sm font-semibold ${
                      feedback.level === 'SECURE' ? 'text-green-600' :
                      feedback.level === 'OK' ? 'text-blue-600' :
                      feedback.level === 'WARNING' ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {feedback.level === 'SECURE' ? 'Strong' :
                       feedback.level === 'OK' ? 'Good' :
                       feedback.level === 'WARNING' ? 'Weak' :
                       'Very Weak'}
                    </span>
                  </div>
                </div> */}

                {/* Progress Bar
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      feedback.level === 'SECURE' ? 'bg-gradient-to-r from-green-400 to-green-600 w-full' :
                      feedback.level === 'OK' ? 'bg-gradient-to-r from-blue-400 to-blue-600 w-3/4' :
                      feedback.level === 'WARNING' ? 'bg-gradient-to-r from-orange-400 to-orange-600 w-1/2' :
                      'bg-gradient-to-r from-red-400 to-red-600 w-1/4'
                    }`}
                  ></div>
                </div> */}
              {/* </div>
            )} */}
            
            {/* Share Button */}
            {password.length > 0 && (
              <button
                onClick={handleShare}
                className="w-full bg-[#242424] hover:bg-[#fff7e4] text-[#fff7e4] hover:text-[#242424] font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform  shadow-[4px_4px_0_#242424] border-2 border-[#242424]"
              >
                Check
              </button>
            )}

            {/* Feedback Message */}
            {password && (
              <div className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                feedback.level === 'SECURE' ? 'bg-green-50 border-green-200 text-green-800' :
                feedback.level === 'OK' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                feedback.level === 'WARNING' ? 'bg-orange-50 border-orange-200 text-orange-800' :
                'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="text-center">
                  <div className={`text-lg sm:text-xl font-bold mb-2 ${
                    feedback.level === 'SECURE' ? 'text-green-700' :
                    feedback.level === 'OK' ? 'text-blue-700' :
                    feedback.level === 'WARNING' ? 'text-orange-700' :
                    'text-red-700'
                  }`}>
                    {feedback.message}
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed opacity-90">
                    {feedback.subtext}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            Keep your passwords strong and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordRoaster;
