"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function StartProject() {
  const { resolvedTheme } = useTheme();

  // Function to load Tally embeds
  const loadTallyEmbeds = () => {
    if (typeof window !== "undefined" && window.Tally) {
      window.Tally.loadEmbeds();
    }
  };

  // Load Tally embeds when component mounts or theme changes
  useEffect(() => {
    loadTallyEmbeds();

    // Add a class to the iframe's parent element based on the current theme
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const iframe = document.querySelector("iframe[data-tally-src]");
          if (iframe) {
            // Set a data attribute on the iframe that can be used in CSS
            iframe.setAttribute("data-theme", resolvedTheme || "light");

            // Try to access the iframe content if possible
            try {
              const iframeDoc =
                iframe.contentDocument || iframe.contentWindow?.document;
              if (iframeDoc && iframeDoc.documentElement) {
                iframeDoc.documentElement.setAttribute(
                  "data-theme",
                  resolvedTheme || "light"
                );
              }
            } catch (e) {
              console.log(
                "Cannot access iframe content due to same-origin policy"
              );
            }
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [resolvedTheme]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15-min-meeting" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <div className="mb-8 text-center pt-8">
        <h2 className="text-black dark:text-white text-3xl md:text-5xl font-medium">
          Ready to Start <br />
          Your Next <span className="text-[#7A7FEE]">Project</span>?
        </h2>
        <p className="text-white text-base md:text-lg leading-relaxed mt-4">
          schedule a call with your project manager
        </p>
      </div>
      <Cal
        namespace="15-min-meeting"
        calLink="forgeyklabs/15-min-meeting"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
