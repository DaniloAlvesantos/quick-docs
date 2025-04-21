import { useEffect, useRef, useState } from "react";

// Extend Window interface to include adsbygoogle
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle?: any[];
  }
}

const AdSenseHorizontal = () => {
  const adRef = useRef<HTMLElement>(null);
  const [adInitialized, setAdInitialized] = useState(false);

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

    // Use ResizeObserver to ensure container has actual width before initializing
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        // Only initialize ad when container has width
        if (entry.contentRect.width > 0 && !adInitialized) {
          initAd();
          setAdInitialized(true);
          // Disconnect observer after successful initialization
          resizeObserver.disconnect();
        }
      }
    });

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

    // First, wait for the script to load
    const waitForScript = () => {
      if (window.adsbygoogle) {
        // Now observe the ad container for size
        if (adRef.current) {
          resizeObserver.observe(adRef.current);
        }
      } else {
        // Script not loaded yet, retry in a moment
        setTimeout(waitForScript, 50);
      }
    };

    // Start the process
    script.onload = waitForScript;
    waitForScript(); // Also try immediately in case script is already loaded

    // Clean up
    return () => {
      resizeObserver.disconnect();
    };
  }, [isLocalhost, adInitialized]);

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
      >
        AdSense Placeholder
      </div>
    );
  }

  // Return actual AdSense component for production
  return (
    <div className="ad-container" style={{ width: "100%", minHeight: "90px", display: "block" }}>
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