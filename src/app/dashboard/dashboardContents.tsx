"use client";
import { useState } from "react";
import AddItem from "./addItem";

export default function DashboardContents() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Body */}
                <div className="bg-gradient-to-t from-[#0f1c52] to-[#162463] p-12 rounded-2xl shadow-xl w-full max-w-lg">
                    <h1 className="text-2xl font-semibold text-white mb-4">Add some items</h1>
                    <p className="text-gray-300 mb-6">TIP: Copy and paste website address to the field above</p>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
                    >
                        + Add Item
                    </button>
                </div>

            {/* Popup Modal */}
            {isOpen && (
                <AddItem />
            )}
        </div>
    );
}
