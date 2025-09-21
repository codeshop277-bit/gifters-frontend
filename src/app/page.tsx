"use client";

import { Shield, Gift, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a1a3f] to-[#0f1c52] flex items-center justify-center p-6">
      {/* Card Container */}
      <div className="w-full max-w-4xl bg-[#0c1535] text-white rounded-2xl shadow-2xl p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold">Gifters</h1>
          <div className="space-x-4">
            <Link href={"/login"}>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium">
              Log in
            </button>
            </Link>
             <Link href={"/signup"}>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium">
              Signup
            </button>
            </Link>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gifters: Share Your Wishlist,
            <br /> Claim the Perfect Gift
          </h2>
          <p className="text-gray-300 mb-12">
            Effortlessly create, share, and claim gifts for any occasion.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 mb-3 text-blue-400" />
              <h3 className="font-semibold">Create Lists</h3>
            </div>
            <div className="flex flex-col items-center">
              <Gift className="w-10 h-10 mb-3 text-blue-400" />
              <h3 className="font-semibold">Share Easily</h3>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-10 h-10 mb-3 text-blue-400" />
              <h3 className="font-semibold">Claim with Confidence</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
