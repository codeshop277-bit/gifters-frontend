"use client"
import React, { useState } from "react";

export default function LearningPage() {
     const [loading, setLoading] = useState<boolean>(false);

  const handleBuyClick = () => {
    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };


    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a3f] to-[#0f1c52] p-6">
            {/* 🌫 Loader Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center 
        backdrop-blur-xl bg-white/5 
        transition-all duration-300 
        ${loading ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="flex flex-col items-center gap-6">

          {/* 🔵 Gradient Animated Ring */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full 
                            bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 
                            animate-bounce">
            </div>

            {/* Inner circle to create ring effect */}
            <div className="absolute inset-3 rounded-full bg-[#0b1c3d]"></div>
          </div>

          <p className="text-white text-lg tracking-wide animate-pulse">
            Processing your gift...
          </p>
        </div>
      </div>

            <section className="bg-gradient-to-b from-[#0b1c3d] to-[#07132b] py-16 px-6">
                <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white shadow-lg hover:shadow-blue-500/40 transition duration-100 hover:scale-105">
                        <h3 className="text-2xl font-semibold mb-4">Birthday Surprise Box 🎉</h3>
                        <p className="text-gray-300 mb-6">
                            Curate the perfect birthday wishlist and let your loved ones claim the gifts you truly want.
                        </p>
                        <button  onClick={handleBuyClick} className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 py-3 rounded-xl font-medium">
                            Buy Gift
                        </button>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white shadow-lg hover:shadow-blue-500/20 transition duration-100 hover:-translate-y-2">
                        <h3 className="text-2xl font-semibold mb-4">Wedding Gift Registry 💍</h3>
                        <p className="text-gray-300 mb-6">
                            Organize your dream wedding wishlist and make gifting seamless for friends and family.
                        </p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 py-3 rounded-xl font-medium">
                            Buy Gift
                        </button>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white shadow-lg hover:shadow-blue-500/80 transition duration-100 hover:-rotate-3">
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
    )
}