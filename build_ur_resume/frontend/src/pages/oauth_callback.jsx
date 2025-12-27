import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = searchParams.get("access_token");
    if(token){
      localStorage.setItem("accessToken", token);
      // optionally remove token from URL
      navigate("/", { replace: true });
    } else {
      navigate("/login");
    }
  },[]);

  return <div className="p-6">Signing you in...</div>;
}
