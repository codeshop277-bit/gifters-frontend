"use client";
import React, { useState } from "react";
import { usePostGiftsMutation } from "../../../services/api";
import { useSelector } from "react-redux";

type AddItemProps = {
    handleClose: () => void,
}

type Details = {
    name: string,
    link: string,
    price: number,
    note: string
}

const AddItem: React.FC<AddItemProps> = ({handleClose}) => {

    const [name, setName] = useState("");
    const [note, setDescription] = useState("");
    const [price, setPrice] = useState(0)
    const [link, setLink] = useState("");

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
                    Add items to your gift list
                </h2>

                {/* Form */}
                <form className="space-y-3">
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-[#162463] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Link"
                         onChange={(e) => setLink(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-[#162463] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                         onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-[#162463] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                         onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-md bg-[#162463] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        onClick={(e) => {
                            const details = {name, link, note,  price}
                            handleAddItem(details)
                        }}
                        className="w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    >
                        Add item
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddItem;