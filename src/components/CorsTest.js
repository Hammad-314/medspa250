"use client";
import React from "react";

export default function CorsTest() {
  const testCors = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/test-connection");
      const data = await res.json();
      console.log("✅ Backend Response:", data);
      alert("✅ CORS OK: " + data.message);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ CORS ERROR — check console for details");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={testCors}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        🔍 Test CORS Connection
      </button>
    </div>
  );
}
