import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../utils/api";

export default function ResumeView() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(apiUrl(`/api/resumes/${id}`))
      .then((r) => r.json())
      .then((data) => setDoc(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Resume {id}</h2>
      {loading && <div>Loading...</div>}
      {!loading && !doc && <div className="text-gray-500">No data yet — worker may still be processing.</div>}
      {doc && (
        <>
          <div className="mb-4">
            <strong>Contacts</strong>
            <pre className="bg-gray-50 p-2 rounded">{JSON.stringify(doc.contacts || {}, null, 2)}</pre>
          </div>

          <div className="mb-4">
            <strong>Skills</strong>
            <div>{(doc.skills || []).join(", ")}</div>
          </div>

          <div className="mb-4">
            <strong>Experience</strong>
            <pre className="bg-gray-50 p-2 rounded">{JSON.stringify(doc.experience || [], null, 2)}</pre>
          </div>

          <div className="mb-4">
            <strong>Raw text (truncated)</strong>
            <div className="max-h-72 overflow-auto p-2 bg-gray-50 rounded">
              <pre className="whitespace-pre-wrap">{(doc.raw_text || "").slice(0, 4000)}</pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
