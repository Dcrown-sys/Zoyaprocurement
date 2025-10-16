import React from "react";

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Privacy Policy & Terms</h1>
      <p>
        View our policy here:{" "}
        <a href="/docs/privacy-policy.pdf" target="_blank" rel="noopener noreferrer">
          Open PDF
        </a>
      </p>
      <iframe
        src="/docs/privacy-policy.pdf"
        width="100%"
        height="800px"
        style={{ border: "1px solid #ccc" }}
      ></iframe>
    </div>
  );
}
