"use client"

import { Suspense } from "react"
import NotesApp from "../components/NotesApp"

function LoadingFallback() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8fafc",
        color: "#64748b",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          border: "2px solid #e2e8f0",
          borderTop: "2px solid #3b82f6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "8px",
        }}
      ></div>
      <span>Loading Notes App...</span>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NotesApp />
    </Suspense>
  )
}
