"use client";
import React, { useState } from "react";
import { usePostGiftsMutation } from "../../../services/api";
import { useSelector } from "react-redux";

type AddItemProps = {
    handleClose: () => void,
    linkUrl: string
}

type Details = {
    name: string,
    link: string,
    price: number,
    note: string
}

const ShareLink: React.FC<AddItemProps> = ({handleClose, linkUrl}) => {


    const [postGifts, {isLoading, error}] = usePostGiftsMutation()
    const authState: any = useSelector((state : any) => state.auth)
    const storedUser = localStorage.getItem("userData");
    const userData = storedUser ? JSON.parse(storedUser) : null;

     const handleAddItem = async (details: Details) => {
        console.log(details)
        const credentials: any = userData;
        console.log(credentials)
        try{
            await postGifts({details, credentials}).unwrap()
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-[#0f1c52] p-6 rounded-xl border border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.7)] w-96 relative">

                {/* Close button */}
                <button
                    className="absolute top-2 right-3 text-gray-400 hover:text-white text-lg"
                    onClick={() => handleClose()}
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-lg font-semibold text-white mb-4">
                    Find the link here!!
                </h2>

                {/* Form */}
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Link"
                        value={linkUrl}
                        disabled
                        className="w-75 px-3 py-2 rounded-md bg-[#162463] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        onClick={(e) => window.open(linkUrl)}
                        className="w-20  ml-6 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    >
                       Open
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShareLink;