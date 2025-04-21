import { useEffect, useRef } from "react";

// Extend Window interface to include adsbygoogle
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle?: any[];
  }
}

const AdSenseHorizontal = () => {
  const adRef = useRef<HTMLElement>(null);

  // Check if running on localhost
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  useEffect(() => {
    // Skip AdSense initialization if on localhost
    if (isLocalhost) return;

    // Only run on client-side
    if (typeof window === "undefined") return;

    // Create script element for AdSense
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5562152054851450";
    script.crossOrigin = "anonymous";

    // Check if script already exists
    if (!document.querySelector(`script[src="${script.src}"]`)) {
      // Add the script to the DOM only if it doesn't exist
      document.head.appendChild(script);
    }

    // Initialize ads
    const initAd = () => {
      try {
        if (adRef.current) {
          // Initialize adsbygoogle if it hasn't been already
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
        }
      } catch (error) {
        console.error("AdSense error:", error);
      }
    };

    // If script already loaded, init ad immediately
    if (window.adsbygoogle) {
      initAd();
    } else {
      // Otherwise wait for it to load
      script.onload = initAd;
    }

    // No need to clean up the script as it should persist
  }, [isLocalhost]);

  // Return a development placeholder if on localhost
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
          marginTop: "-1rem",
          height: "90px",
          width: "100%",
          maxWidth: "728px",
          lineHeight: "50px",
          fontSize: "14px",
          color: "#666",
        }}
      ></div>
    );
  }

  // Return actual AdSense component for production
  return (
    <div className="ad-container">
      <ins
        ref={adRef as React.RefObject<HTMLModElement>}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5562152054851450"
        data-ad-slot="5178643206"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseHorizontal;
