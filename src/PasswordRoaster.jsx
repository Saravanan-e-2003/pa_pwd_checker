import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";


const PasswordRoaster = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resultFetched, setResultFetched] = useState(false);
  const [loading,setLoading] = useState(false);
  const [feedback, setFeedback] = useState("Loading...");
  let replyColor = 'border-green-600 text-green-800'


  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const handleChange = (e) => {
    const val = e.target.value;
    setPassword(val);
  };

  async function getRoast(password) {
    try{
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Roast the following password in a aggresive way, make it as funny as possible , [It should be not more than 1 line] : "${password}"`
      });
      
    
      return response.text;
    }catch(error){
      replyColor = 'border-red-600 text-red-800'
      console.error("Error generating content:", error.message);
      return error.message || "An error occurred while generating content.";
    }
}
  const handleCheck = async() => {
    setLoading(true);
    setFeedback("Loading..."); 

    let roast = await getRoast(password);
    roast = roast.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    roast = roast.replace(/\*(.*?)\*/g, '<em>$1</em>');

    setFeedback(roast);
    setLoading(false);
    setResultFetched(true);
  };

  const buttonText = loading ? "loading..." : "Check";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#a9d2b8]">
      <div className="w-full max-w-lg mx-auto ">
        {/* Main Card */}
        <div className="bg-[#242424] rounded-2xl shadow-[6px_6px_0_#242424] border-4 border-[#242424] overflow-hidden">
          {/* Header */}
          <div className="bg-[#242424] p-6 text-white">
            <div className="text-center">
              <h1 className="text-2xl text-[#fff7e4] sm:text-3xl font-bold mb-2">Password Roaster</h1>
              <p className="text-[#f5edda] text-sm sm:text-base">Security advice with a side of salt</p>
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

            {/* Share Button */}
            {password.length > 0 && (
              <button
                onClick={handleCheck}
                disabled={loading}

                className="w-full bg-[#242424] hover:bg-[#fff7e4] text-[#fff7e4] hover:text-[#242424] font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform  shadow-[4px_4px_0_#242424] border-2 border-[#242424]"
              >
                {buttonText}
              </button>
            )}

            {/* Feedback Message */}
            {resultFetched && (
              <div className={`p-5 rounded-xl border-2 transition-all duration-300 
                bg-red-50 border-${replyColor} text-${replyColor
              }`}>
                <div className="text-center">
                  <p className="text-sm sm:text-base leading-relaxed opacity-90">
                    <span dangerouslySetInnerHTML={{ __html: feedback }}></span>
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            Powered by AI and pure spite.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordRoaster;
