'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useClaimGiftMutation, useGetGiftsListQuery } from '../../../../services/api';
import GoogleLoginButton from '@/app/components/page';

interface Gift {
    name: string;
    link: string;
    price: number;
    claimed: boolean;
}

interface User {
    id: string,
    name: string,
    email: string
}
interface userData {
    user: User
    access_token: string
}

export default function UsersGiftsList() {
    // Example data — replace or fetch dynamically

    const authState = useSelector((state: any) => state.auth)
    const storedUser = window?.localStorage.getItem("userData");
    const userData = storedUser ? JSON.parse(storedUser) : null;
    const { data, isLoading, error , refetch} = useGetGiftsListQuery(
        { credentials: userData },
        {
            refetchOnMountOrArgChange: true
        }
    )
    const [claimGift] = useClaimGiftMutation();
    const [openShare, setOpenShare] = useState(false);

// import { useGetGiftsListQuery } from "@/store/api"

// const { gifts } = useGetGiftsListQuery(
//   { userId, token },
//   {
//     selectFromResult: ({ data }) => ({
//       gifts: data
//     })
//   }
// )
// import { store } from "@/store"
// import { api } from "@/store/api"

// const state = store.getState()

// const giftsResult =
//   api.endpoints.getGiftsList.select({ userId, token })(state)

// const gifts = giftsResult?.data

// Accessing data from a query in RTK Query can be done in several ways, depending on the context of your component and how you want to manage the data. Here are some common methods:


    useEffect(() => {

        // setUserData(creds);
        if (userData !== null) {
            refetch()
        }
    }, [authState.refreshList])

    const fetchGiftsList = async (creds: userData) => {
        // const credentials = creds;
        // try {
        //     await gifts({ credentials }).unwrap()
        // } catch (e) {
        //     console.log(e)
        // }
    }
    const handleClaimGift = async (gift: Gift) => {
        const credentials = userData;
        try {
            await claimGift({ credentials, gift }).unwrap()
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f1c52] to-[#1c2a6c] flex flex-col text-white">

            {/* Header Section */}
            <header className="w-full bg-gradient-to-r from-[#162463] to-[#0f1c52] text-white shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg"></div>
                        <span className="text-xl font-bold tracking-wide">Gifters</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-start text-center px-4 py-12">
                {
                    userData != null ?
                        <h1 className="text-3xl font-bold mb-8 text-white-400">{userData.user.name}'s Gifts List</h1> :
                        <GoogleLoginButton autoTrigger={true} />
                }

                <div className="w-full max-w-5xl overflow-x-auto rounded-2xl shadow-lg bg-[#1a2a6c]/50 backdrop-blur-sm">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-gradient-to-r from-[#243b87] to-[#1a2a6c] text-white-300 uppercase text-sm">
                                <th className="py-3 px-4 border-b border-[#33427a]">Name</th>
                                <th className="py-3 px-4 border-b border-[#33427a]">Link</th>
                                <th className="py-3 px-4 border-b border-[#33427a]">Price</th>
                                <th className="py-3 px-4 border-b border-[#33427a]">Claimed</th>
                                <th className="py-3 px-4 border-b border-[#33427a]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                authState.giftsList.length > 0 &&
                                authState.giftsList.map((gift: Gift, index: number) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-[#2a3c8a]/40 transition-colors duration-200"
                                    >
                                        <td className="py-3 px-4 border-b border-[#2f3f7a] font-medium">{gift.name}</td>
                                        <td className="py-3 px-4 border-b border-[#2f3f7a]">
                                            <a
                                                href={gift.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-300 hover:text-orange-400 underline"
                                            >
                                                Visit Site
                                            </a>
                                        </td>
                                        <td className="py-3 px-4 border-b border-[#2f3f7a] text-gray-200">
                                            ₹{gift.price.toLocaleString()}
                                        </td>
                                        <td className="py-3 px-4 border-b border-[#2f3f7a]">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${gift.claimed
                                                    ? 'bg-green-600/70 text-white'
                                                    : 'bg-red-600/70 text-white'
                                                    }`}
                                            >
                                                {gift.claimed ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 border-b border-[#2f3f7a] text-gray-200">
                                            <button
                                                onClick={() => handleClaimGift(gift)}
                                                className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
                                            >
                                                Claim
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
