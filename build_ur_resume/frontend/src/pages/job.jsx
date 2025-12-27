import React, { useState } from "react";
import { postJson } from "../utils/api";

export default function Job() {
  const [jd, setJd] = useState("");
  const [resumeId, setResumeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleScore(e) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const payload = { job_description: jd };
      if (resumeId) payload.resume_id = resumeId;
      const { ok, data } = await postJson("/api/ats/score", payload);
      if (!ok) throw new Error(data?.detail || JSON.stringify(data));
      setResult(data);
    } catch (err) {
      setError(err.message || "Scoring failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">ATS Scoring</h2>

      <form onSubmit={handleScore} className="space-y-4">
        <input value={resumeId} onChange={(e) => setResumeId(e.target.value)} placeholder="Optional resume id" className="w-full p-2 border rounded" />
        <textarea value={jd} onChange={(e) => setJd(e.target.value)} rows={10} className="w-full p-2 border rounded" placeholder="Paste job description"></textarea>

        <div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>{loading ? "Scoring..." : "Compute ATS Score"}</button>
        </div>

        {error && <div className="text-red-600">{error}</div>}

        {result && (
          <div className="mt-4 p-3 border rounded bg-gray-50">
            <h3 className="font-semibold">Score: {result.score}</h3>
            <pre className="text-sm mt-2 bg-white p-2 rounded border">{JSON.stringify(result.breakdown || result, null, 2)}</pre>
            {result.recommendations && <div className="mt-2"><strong>Recommendations</strong><ul className="list-disc ml-6">{result.recommendations.map((r,i)=><li key={i}>{r}</li>)}</ul></div>}
          </div>
        )}
      </form>
    </div>
  );
}
