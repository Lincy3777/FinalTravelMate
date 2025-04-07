
"use client";

import { useEffect, useState } from "react";

export default function AnalyticsDashboard() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetabaseUrl = async () => {
      try {
        const response = await fetch("/api/getMetabaseUrl");
        const data = await response.json();
        setIframeUrl(data.iframeUrl);
      } catch (error) {
        console.error("Error fetching Metabase URL:", error);
      }
    };

    fetchMetabaseUrl();
  }, []);

  if (!iframeUrl) {
    return <p className="text-center text-lg font-semibold">Loading dashboard...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full p-4">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        📊 Analytics Dashboard
      </h1>
      <iframe
        src={iframeUrl}
        style={{ border: "none" }}
        className="w-full h-full max-w-5xl max-h-[80vh] border rounded-lg shadow-lg"
      />
    </div>
  );
}
