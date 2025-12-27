import React, { useState } from "react";
import { apiUrl } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!file) return setError("Please choose a file.");

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(apiUrl("/api/resumes/upload"), {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || JSON.stringify(data));
      // navigate to resume viewer
      navigate(`/resume/${data.resume_id}`);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
        <div>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>
            {loading ? "Uploading..." : "Upload & Parse"}
          </button>
        </div>

        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}
