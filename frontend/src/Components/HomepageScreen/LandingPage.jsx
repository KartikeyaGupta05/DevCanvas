import React from "react";
import blob from "../../assets/blobanimation.svg";

function LandingPage() {
  return (
    <div className="landingContainer container">
      <img src={blob} alt="" className="blob_a blob1" />
      <img src={blob} alt="" className="blob_a blob2" />
      <div className="landingInfo">
        <h1>DevCanvas</h1>

        <p className="heroSubtitle">
          Build, run, and experiment with code — directly in your browser.
        </p>

        <p className="heroDesc">
          A modern developer playground supporting Python, Dart, OCR-based
          input, and voice-powered coding.
        </p>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <a href="/editor/java">
            <button className="btn">Start Coding</button>
          </a>
          {/* <a
            href="#features"
            style={{ color: "var(--text-muted)", alignSelf: "center" }}
          >
            Explore Features →
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
