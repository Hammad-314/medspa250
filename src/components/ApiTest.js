"use client";
import React, { useState } from "react";
import { apiFetch } from "../utilits/api";

export default function ApiTest() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('test-connection');
      setResult(`✅ Success: ${JSON.stringify(data)}`);
    } catch (err) {
      setResult(`❌ Error: ${err.message || JSON.stringify(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">API Integration Test</h2>
      <button
        onClick={testConnection}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test API Connection"}
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

