"use client";
import { useState } from "react";

export default function AddItem() {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-[#0f1c52] p-6 rounded-xl border border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.7)] w-96 relative">

                {/* Close button */}
                <button
                    className="absolute top-2 right-3 text-gray-400 hover:text-white text-lg"
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-lg font-semibold text-white mb-4">
                    Add items to your gift list
                </h2>

                {/* Form */}
                <form className="space-y-3">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-3 py-2 rounded-md bg-[#162463] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Link"
                        className="w-full px-3 py-2 rounded-md bg-[#162463] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="w-full px-3 py-2 rounded-md bg-[#162463] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="w-full px-3 py-2 rounded-md bg-[#162463] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    >
                        Add item
                    </button>
                </form>
            </div>
        </div>
    );
}
