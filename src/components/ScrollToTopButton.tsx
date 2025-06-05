"use client";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"
      >
        <svg
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
          className="mx-auto"
        >
          <path
            d="M12 19V5M12 5l-7 7M12 5l7 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
} 