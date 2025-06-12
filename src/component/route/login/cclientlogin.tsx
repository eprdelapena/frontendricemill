"use client";

import useV1Login from "@/hooks/api_hooks/usev1login";

const CClientLogin = () => {
  const { credentials, setCredentials, getV1Login } = useV1Login();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-2xl mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
              <path d="M8 11h8v2H8z" fill="white" opacity="0.8" />
              <path d="M8 14h8v1H8z" fill="white" opacity="0.6" />
              <path d="M8 16h6v1H8z" fill="white" opacity="0.4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Rice Mill Admin
          </h1>
          <p className="text-gray-300 text-lg">Management System</p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Administrator Access
            </h2>
            <p className="text-gray-500">
              Enter your credentials to access the system
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Administrator ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => {
                    setCredentials((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }));
                  }}
                  required
                  placeholder="Enter Administrator ID"
                  className="w-full pl-12 pr-4 py-4 text-gray-800 bg-gray-50 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-3 focus:ring-orange-500/30 focus:border-orange-500 hover:border-gray-300 transition-all duration-300 text-lg font-medium placeholder:text-gray-400 placeholder:font-normal"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => {
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  required
                  placeholder="Enter Security Password"
                  className="w-full pl-12 pr-4 py-4 text-gray-800 bg-gray-50 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-3 focus:ring-orange-500/30 focus:border-orange-500 hover:border-gray-300 transition-all duration-300 text-lg font-medium placeholder:text-gray-400 placeholder:font-normal"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-3 focus:ring-orange-500/50 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 uppercase tracking-wide"
              onClick={() => {
                getV1Login();
              }}
            >
              Access System
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-3 text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">
                Secured by 256-bit SSL Encryption
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            © 2024 Rice Mill Management System. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4 text-gray-500 text-xs">
            <span>Version 2.1.0</span>
            <span>•</span>
            <span>Last Updated: Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CClientLogin;
