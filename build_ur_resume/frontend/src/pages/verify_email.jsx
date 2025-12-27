import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../layout";

// Note: Ensure this route is added to your App router configuration as "/verify-email"

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'

  useEffect(() => {
    if (!token) {
        setStatus("error");
        return;
    }

    // Mock API call to verify token
    const verifyToken = async () => {
        try {
            // Simulated delay for API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            // const res = await fetch(`/api/auth/verify?token=${token}`);
            // if(res.ok) setStatus("success");
            // else setStatus("error");
            
            setStatus("success"); // Mock success
        } catch (e) {
            setStatus("error");
        }
    };

    verifyToken();
  }, [token]);

  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
          
          {status === "verifying" && (
            <div className="animate-pulse">
                <div className="mx-auto h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="h-8 w-8 text-violet-600 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying your email...</h2>
                <p className="text-gray-600">Please wait while we confirm your account.</p>
            </div>
          )}

          {status === "success" && (
            <div className="animate-fadeIn">
                <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                <p className="text-gray-600 mb-8">Your account has been successfully verified. You can now access all features.</p>
                
                <Link 
                    to="/dashboard" 
                    className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-violet-600 hover:bg-violet-700 shadow-sm transition-all hover:-translate-y-0.5"
                >
                    Go to Dashboard
                </Link>
            </div>
          )}

          {status === "error" && (
            <div className="animate-fadeIn">
                <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                <p className="text-gray-600 mb-8">The verification link is invalid or has expired.</p>
                
                <div className="flex flex-col gap-3">
                    <Link 
                        to="/login" 
                        className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-violet-600 hover:bg-violet-700 shadow-sm"
                    >
                        Back to Login
                    </Link>
                    <button className="text-violet-600 hover:text-violet-700 font-medium text-sm">
                        Resend verification link
                    </button>
                </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}