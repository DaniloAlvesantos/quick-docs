import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle?: any[];
  }
}

const AdSenseHorizontal = () => {
  const adRef = useRef<HTMLElement>(null);
  
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  useEffect(() => {
    if (isLocalhost || !adRef.current) return;
    
    try {
      // Initialize adsbygoogle if it hasn't been already
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [isLocalhost]);

  if (isLocalhost) {
    return (
      <div
        style={{
          display: "block",
          backgroundColor: "#f0f0f0",
          border: "1px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          marginBottom: "1rem",
          height: "90px",
          width: "100%",
          maxWidth: "728px",
          lineHeight: "50px",
          fontSize: "14px",
          color: "#666",
        }}
      >
        AdSense Placeholder
      </div>
    );
  }

  return (
    <div className="ad-container" style={{ width: "100%", minHeight: "90px", margin: "1rem 0" }}>
      <ins
        ref={adRef as React.RefObject<HTMLModElement>}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px", width: "100%" }}
        data-ad-client="ca-pub-5562152054851450"
        data-ad-slot="5178643206"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseHorizontal;