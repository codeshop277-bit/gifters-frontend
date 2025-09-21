"use client";

import Link from "next/link";
import { useState } from "react";
import { registerUserDetails } from "../services/auth";
import { useRouter } from "next/navigation";
import FullPageSpinner from "../../../utils/spinner";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const handleRegister = () => {
    if(password === confirmPassword){
    setLoader(true);
      const userDetails = {
        name, email, password
      }
      const register = registerUserDetails(userDetails).then((details) => {
        console.log(details);
        router.push("/login");
        setLoader(false);

      });
      console.log(register);
    }else{
      window.alert("Password does not match")
    }

  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a3f] to-[#0f1c52] p-6">
      <div className="w-full max-w-md bg-[#0c1535]/90 text-white rounded-2xl shadow-2xl p-8 backdrop-blur">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {
          loader && <FullPageSpinner />
        }
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-[#0f1c52] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-[#0f1c52] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-[#0f1c52] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-[#0f1c52] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
               onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={() => handleRegister()}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}
