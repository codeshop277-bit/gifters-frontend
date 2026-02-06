"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LearningPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleBuyClick = () => {
    setLoading(true);
    setProgress(0);
  };

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [loading]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a3f] to-[#0f1c52] p-6">

      {/* 🔥 Animated Loader Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-white/5"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              {/* 🔵 Circular Progress */}
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background Circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="transparent"
                  />

                  {/* Progress Circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />

                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
                  {progress}%
                </div>
              </div>

              <p className="text-white/80 tracking-wide">
                Processing your gift...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards Section */}
      <section className="bg-gradient-to-b from-[#0b1c3d] to-[#07132b] py-16 px-6 rounded-2xl">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">

          {/* First Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white shadow-lg hover:shadow-blue-500/40 transition duration-200 hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4">Birthday Surprise Box 🎉</h3>
            <p className="text-gray-300 mb-6">
              Curate the perfect birthday wishlist and let your loved ones claim the gifts you truly want.
            </p>
            <button
              onClick={handleBuyClick}
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 active:scale-95 py-3 rounded-xl font-medium"
            >
              Buy Gift
            </button>
          </div>

          {/* Second Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white shadow-lg hover:shadow-blue-500/20 transition duration-200 hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4">Wedding Gift Registry 💍</h3>
            <p className="text-gray-300 mb-6">
              Organize your dream wedding wishlist and make gifting seamless for friends and family.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 py-3 rounded-xl font-medium">
              Buy Gift
            </button>
          </div>

          {/* Third Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white shadow-lg hover:shadow-blue-500/80 transition duration-200 hover:-rotate-3">
            <h3 className="text-2xl font-semibold mb-4">Festive Celebration 🎁</h3>
            <p className="text-gray-300 mb-6">
              Share your festive wishlist and allow others to reserve gifts with confidence.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 py-3 rounded-xl font-medium">
              Buy Gift
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}
