"use client"

import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import * as HiIcons from "react-icons/hi";


export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple password regex: at least 1 capital, 1 number, min 6 chars
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/
    if (!passwordRegex.test(password)) {
      setError("Password must have at least 6 characters, 1 capital letter, and 1 number")
      return
    }

    login(email) // log in
    navigate("/") // go home
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-[#16A34A] text-center">Welcome Back!</h2>
        <p className="text-center text-[#1E293B]/80">Log in to access your recipes</p>

        {/* Email */}
        <div className="relative">

          <HiIcons.HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-[#16A34A]/80 text-xl" />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border-2 border-[#FEE2E2] rounded-xl focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] outline-none transition"
          />
        </div>

        {/* Password */}
        <div className="relative">
         <HiIcons.HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-[#16A34A]/80 text-xl" />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border-2 border-[#FEE2E2] rounded-xl focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] outline-none transition"
          />
        </div>

        {error && <p className="text-sm text-[#EF4444]">{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-3 rounded-xl font-semibold transition-colors"
        >
          Log In
        </button>

        {/* Footer */}
        <p className="text-center text-[#1E293B]/70 text-sm">
          Don't have an account?{" "}
          <span className="text-[#F97316] font-semibold cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  )
}
