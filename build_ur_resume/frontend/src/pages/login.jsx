import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJson } from "../utils/api";

export default function AuthPage({ initialView = "login" }) {
  const [view, setView] = useState(initialView);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // Login State
  const [identifier, setIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Shared handlers
  const switchView = (v) => {
    setView(v);
    setErr(null);
  };

  async function handleLogin(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { ok, data } = await postJson("/api/auth/login", { email: identifier, password: loginPassword });
      if (!ok) throw new Error(data?.detail || "Login failed");
      localStorage.setItem("accessToken", data.access_token);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const payload = { firstName, lastName, email, phone, password };
      const { ok, data } = await postJson("/api/auth/register", payload);
      if (!ok) throw new Error(data?.detail || "Registration failed");
      setView("login");
      setIdentifier(email);
      alert("Registration successful! Please log in.");
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }

  const SocialButtons = () => (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <button
        onClick={() => { window.location.href = `${API_URL}/api/auth/oauth/google/login`; }}
        className="flex items-center justify-center gap-2 h-12 rounded-full border border-border-soft hover:bg-soft-cream transition-colors text-text-dark font-bold text-sm group dark:border-dark-border dark:hover:bg-dark-input-bg dark:text-off-white dark:bg-[#2e2b29]"
      >
        <svg aria-hidden="true" className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12.0003 20.45c4.6667 0 7.895-3.2383 8.1634-8.0867h-8.1634v3.3934h4.725c-.2184 1.3417-1.3717 3.5117-4.725 3.5117-2.85 0-5.1767-2.3167-5.1767-5.1767s2.3267-5.1767 5.1767-5.1767c1.3283 0 2.4933.4867 3.2883 1.25l2.52-2.52c-1.66-1.5517-3.805-2.48-5.8083-2.48-4.8117 0-8.7267 3.915-8.7267 8.7267s3.915 8.7267 8.7267 8.7267z" fill="currentColor"></path></svg>
        Google
      </button>
      <button
        onClick={() => { window.location.href = `${API_URL}/api/auth/oauth/linkedin/login`; }}
        className="flex items-center justify-center gap-2 h-12 rounded-full border border-border-soft hover:bg-soft-cream transition-colors text-text-dark font-bold text-sm group dark:border-dark-border dark:hover:bg-dark-input-bg dark:text-off-white dark:bg-[#2e2b29]"
      >
        <svg aria-hidden="true" className="h-5 w-5 text-[#0A66C2] group-hover:scale-110 transition-transform dark:text-[#4a9cd6]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg>
        LinkedIn
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-soft-cream bg-[radial-gradient(#e6e1d6_1px,transparent_1px)] [background-size:24px_24px] dark:bg-dark-charcoal dark:bg-[radial-gradient(#44403c_1px,transparent_1px)] font-body text-text-dark dark:text-off-white">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-border-soft overflow-hidden flex flex-col lg:flex-row relative z-10 dark:bg-dark-card-bg dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] dark:border-dark-border">

        {/* LEFT SIDE: Form Area */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-center relative">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-10 text-primary select-none dark:text-dark-accent">
            <div className="size-8">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 31.5022 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className="text-xl font-heading font-bold text-text-dark dark:text-off-white">ResumeAI</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-dark mb-3 dark:text-off-white">
              {view === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-text-light text-lg font-light dark:text-light-cream">
              {view === "login" ? "Let's continue building your story." : "Join thousands of professionals today."}
            </p>
          </div>

          {/* View Toggle */}
          <div className="p-1.5 bg-soft-cream rounded-2xl flex w-full mb-8 border border-border-soft/60 dark:bg-dark-input-bg dark:border-dark-border">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="auth_mode"
                className="peer sr-only"
                checked={view === "login"}
                onChange={() => switchView("login")}
              />
              <div className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-text-light peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] dark:text-dark-text-medium dark:peer-checked:bg-[#33302d] dark:peer-checked:text-dark-accent dark:peer-checked:shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                Log In
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="auth_mode"
                className="peer sr-only"
                checked={view === "register"}
                onChange={() => switchView("register")}
              />
              <div className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-text-light peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] dark:text-dark-text-medium dark:peer-checked:bg-[#33302d] dark:peer-checked:text-dark-accent dark:peer-checked:shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                Sign Up
              </div>
            </label>
          </div>

          <SocialButtons />

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-border-soft dark:border-dark-border"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-bold text-text-light uppercase tracking-widest opacity-60 dark:text-dark-text-medium">Or via email</span>
            <div className="flex-grow border-t border-border-soft dark:border-dark-border"></div>
          </div>

          {err && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {err}
            </div>
          )}

          {/* LOGIN FORM */}
          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text-dark mb-1.5 ml-1 dark:text-off-white">Email Address</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-[20px] group-focus-within:text-primary transition-colors dark:text-dark-text-medium dark:group-focus-within:text-dark-accent">mail</span>
                  <input
                    className="w-full pl-11 pr-4 h-12 bg-white border border-border-soft rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary text-text-dark placeholder-text-light/50 transition-all font-body outline-none dark:bg-dark-input-bg dark:border-dark-border dark:text-off-white dark:placeholder-dark-text-medium/40 dark:focus:border-dark-accent dark:focus:ring-dark-accent"
                    placeholder="hello@creative.com"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-text-dark mb-1.5 ml-1 dark:text-off-white">Password</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-[20px] group-focus-within:text-primary transition-colors dark:text-dark-text-medium dark:group-focus-within:text-dark-accent">lock</span>
                  <input
                    className="w-full pl-11 pr-11 h-12 bg-white border border-border-soft rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary text-text-dark placeholder-text-light/50 transition-all font-body outline-none dark:bg-dark-input-bg dark:border-dark-border dark:text-off-white dark:placeholder-dark-text-medium/40 dark:focus:border-dark-accent dark:focus:ring-dark-accent"
                    placeholder="••••••••"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-primary transition-colors cursor-pointer dark:text-dark-text-medium dark:hover:text-dark-accent">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-end mt-3 mb-8">
                <a className="text-sm font-bold text-primary hover:text-primary-hover hover:underline decoration-2 underline-offset-2 dark:text-dark-accent dark:hover:text-dark-accent-hover" href="#">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-lg shadow-[0_4px_14px_rgba(192,117,93,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 dark:bg-dark-accent dark:hover:bg-dark-accent-hover dark:text-[#292524] dark:shadow-[0_4px_14px_rgba(212,133,110,0.2)]"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {view === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-text-dark mb-1.5 ml-1 dark:text-off-white">First Name</label>
                  <input
                    className="w-full px-4 h-12 bg-white border border-border-soft rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary text-text-dark placeholder-text-light/50 transition-all font-body outline-none dark:bg-dark-input-bg dark:border-dark-border dark:text-off-white dark:placeholder-dark-text-medium/40 dark:focus:border-dark-accent dark:focus:ring-dark-accent"
                    placeholder="Jane"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-dark mb-1.5 ml-1 dark:text-off-white">Last Name</label>
                  <input
                    className="w-full px-4 h-12 bg-white border border-border-soft rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary text-text-dark placeholder-text-light/50 transition-all font-body outline-none dark:bg-dark-input-bg dark:border-dark-border dark:text-off-white dark:placeholder-dark-text-medium/40 dark:focus:border-dark-accent dark:focus:ring-dark-accent"
                    placeholder="Doe"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-dark mb-1.5 ml-1 dark:text-off-white">Email</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-[20px] group-focus-within:text-primary transition-colors dark:text-dark-text-medium dark:group-focus-within:text-dark-accent">mail</span>
                  <input
                    className="w-full pl-11 pr-4 h-12 bg-white border border-border-soft rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary text-text-dark placeholder-text-light/50 transition-all font-body outline-none dark:bg-dark-input-bg dark:border-dark-border dark:text-off-white dark:placeholder-dark-text-medium/40 dark:focus:border-dark-accent dark:focus:ring-dark-accent"
                    placeholder="hello@creative.com"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-dark mb-1.5 ml-1 dark:text-off-white">Phone</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-[20px] group-focus-within:text-primary transition-colors dark:text-dark-text-medium dark:group-focus-within:text-dark-accent">call</span>
                  <input
                    className="w-full pl-11 pr-4 h-12 bg-white border border-border-soft rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary text-text-dark placeholder-text-light/50 transition-all font-body outline-none dark:bg-dark-input-bg dark:border-dark-border dark:text-off-white dark:placeholder-dark-text-medium/40 dark:focus:border-dark-accent dark:focus:ring-dark-accent"
                    placeholder="+1 234 567 8900"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-dark mb-1.5 ml-1 dark:text-off-white">Password</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-[20px] group-focus-within:text-primary transition-colors dark:text-dark-text-medium dark:group-focus-within:text-dark-accent">lock</span>
                  <input
                    className="w-full pl-11 pr-4 h-12 bg-white border border-border-soft rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary text-text-dark placeholder-text-light/50 transition-all font-body outline-none dark:bg-dark-input-bg dark:border-dark-border dark:text-off-white dark:placeholder-dark-text-medium/40 dark:focus:border-dark-accent dark:focus:ring-dark-accent"
                    placeholder="Create a password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-lg shadow-[0_4px_14px_rgba(192,117,93,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 mt-6 dark:bg-dark-accent dark:hover:bg-dark-accent-hover dark:text-[#292524] dark:shadow-[0_4px_14px_rgba(212,133,110,0.2)]"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
          )}

          <p className="text-center text-xs text-text-light mt-8 dark:text-dark-text-medium">
            By {view === "login" ? "logging in" : "signing up"}, you agree to our <a className="text-primary font-bold hover:underline decoration-1 underline-offset-2 dark:text-dark-accent" href="#">Terms</a> and <a className="text-primary font-bold hover:underline decoration-1 underline-offset-2 dark:text-dark-accent" href="#">Privacy Policy</a>.
          </p>
        </div>

        {/* RIGHT SIDE: Visual Area */}
        <div className="hidden lg:block w-1/2 relative bg-accent-green dark:bg-dark-forest-green">
          <div aria-label="Cozy minimalist room with chair and plant" className="absolute inset-0 bg-cover bg-center" role="img" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmfR2t71RwdGtG4htQCof7w7udDyP-LXWfnhBwzImxvhEY2VWepW8UUHXWIq0YWtp4u3xGVzptwNX2sHdiIdHf5voKppPvgDVkIVEhLT0snfScKgU2efB3k3-2gPJ4MJE3a9bLm1QgM600iDUEMekwkHAzrgZGLL2ygc37Wzyv1o6Vo0UexDj5ry8yUb741lB7cu8TxlkjlKbnbIBKDfUucKFhTOIozh3XzSo4s8IHj8PomFzqhdZm-e4jUS_8BidfT9XsoTC8mec')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-accent-green/95 via-accent-green/40 to-transparent dark:from-dark-forest-green/95 dark:via-dark-forest-green/60"></div>
          <div className="absolute bottom-0 left-0 w-full p-12 text-white z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 mb-6 shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-[#FFD700]">star</span>
              <span className="text-xs font-bold tracking-wide">TRUSTED BY CREATIVES</span>
            </div>
            <blockquote className="text-3xl font-heading font-bold leading-tight mb-8 drop-shadow-sm text-white/95">
              "The most intuitive resume builder I've ever used. It feels like a boutique design studio in your pocket."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full p-1 border border-white/40 backdrop-blur-sm">
                <img alt="Sarah Jenkins" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0VM5sUdFbeLG5wE3vzxD-TLRmGSskAjZFMaB0TnPqnWlfWUBCWVB1HXWBf2dKTdP-C_UbjS_cbP3ZV0fcntn4CCZgcmTnjXLh0BlF6FCRFVVnftLMTipjtYs1NKM9RDarmLFwj1rg1VtJuE3P6ykjfwmx4CMixMLuuAoh5HWUi-Y0Iu9gOZ-iEKG8H1qW2qYBMGUDiscvTswdyn-WIQ7PskBSpSggBvv9MGGc_C1SI8kPaHq5K_1mQyrsM5-VP-TI8llSsYT89vQ" />
              </div>
              <div>
                <div className="font-bold font-heading text-lg">Sarah Jenkins</div>
                <div className="text-sm opacity-90 font-light">Senior Product Designer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}