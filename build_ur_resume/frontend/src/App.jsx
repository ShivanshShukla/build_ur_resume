import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import ProtectedRoute from "./components/protected_route";

// Lazy Load Pages
const Home = lazy(() => import("./pages/home"));
const Upload = lazy(() => import("./pages/upload"));
const Job = lazy(() => import("./pages/Job"));
const ResumeView = lazy(() => import("./pages/resume_view"));
const Login = lazy(() => import("./pages/login"));
// Register is now handled by Login component
const OAuthCallback = lazy(() => import("./pages/oauth_callback"));
const Builder = lazy(() => import("./pages/builder"));
const Dashboard = lazy(() => import("./pages/dashboard"));

// Simple Loading Component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-soft-cream">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

export default function App() {
  return (
    <div className="app-container">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/upload" element={<Layout><Upload /></Layout>} />
          <Route path="/job" element={<Layout><Job /></Layout>} />
          <Route path="/resume/:id" element={<Layout><ResumeView /></Layout>} />

          {/* Auth - No Layout */}
          <Route path="/login" element={<Login initialView="login" />} />
          <Route path="/register" element={<Login initialView="register" />} />

          {/* Protected Routes */}
          <Route path="/account" element={<Layout><ProtectedRoute><div className="p-6">Account area (protected)</div></ProtectedRoute></Layout>} />
          <Route path="/oauth-callback" element={<OAuthCallback />} />

          {/* Main App Routes */}
          <Route path="/resume-builder" element={<Layout><Builder /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        </Routes>
      </Suspense>
    </div>
  );
}