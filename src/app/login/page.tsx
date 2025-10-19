"use client";

import Link from "next/link";
import { useState } from "react";
import { fetchLoginDetails } from "../services/auth";
import FullPageSpinner from "../../../utils/spinner";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../../../services/api";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [login, {isLoading, error}] = useLoginMutation()

  const handleLogin = async () => {
    try{
      await login({email, password}).unwrap();
      router.push("/gifts-list");
    }catch(err){
      console.log("Login failed", err)
    }
    // setLoader(true);
    // const credentials = {
    //   email: email,
    //   password: password
    // };

    // const login = fetchLoginDetails(credentials).then((details: any) => {
    //   router.push("/dashboard");
    //   setLoader(false);
    // });
   
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a3f] to-[#0f1c52] p-6">
      <div className="w-full max-w-md bg-[#0c1535]/90 text-white rounded-2xl shadow-2xl p-8 backdrop-blur">
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
      {
        isLoading && <FullPageSpinner />
      }
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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

          <div className="float-right text-sm text-blue-400">
            <button type="button" className="hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            onClick={() => handleLogin()}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
