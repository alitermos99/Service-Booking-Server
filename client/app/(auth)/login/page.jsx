'use client';

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen hero-grid flex items-center justify-center p-4 relative">

      {/* ORBS */}
      <div className="orb w-96 h-96 bg-[#6c63ff] opacity-20 top-0 left-0 -translate-x-1/3 -translate-y-1/3" />
      <div className="orb w-80 h-80 bg-[#38bdf8] opacity-10 bottom-0 right-0 translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 w-full max-w-md">

        {/* LOGO */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center text-white">
              📅
            </div>

            <span className="font-bold text-xl">
              Reserv<span style={{ color: "#6c63ff" }}>Ease</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-[#8888aa] mt-1">
            Sign in to your account to continue
          </p>
        </div>

        {/* CARD */}
        <div className="glass rounded-3xl p-8">

          {/* SOCIAL */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="social-btn">Google</button>
            <button className="social-btn">GitHub</button>
          </div>

          {/* DIVIDER */}
          <div className="divider mb-6">
            or continue with email
          </div>

          {/* FORM */}
          <div className="space-y-4">

            <div>
              <label className="text-sm">Email address</label>
              <input
                type="email"
                className="input-field mt-1"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label className="text-sm">Password</label>
                <a className="text-xs text-[#6c63ff]" href="#">
                  Forgot password?
                </a>
              </div>

              <div className="relative mt-1">
                <input
                  type={show ? "text" : "password"}
                  className="input-field pr-10"
                  placeholder="••••••••"
                />

                <button
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8888aa]"
                >
                  👁
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#6c63ff]" />
              <span className="text-sm text-[#8888aa]">
                Remember me for 30 days
              </span>
            </div>

            <Link
              href="/admin/dashboard"
              className="block text-center btn-primary text-white font-semibold py-3 rounded-xl mt-2"
            >
              Sign in
            </Link>
          </div>

          <p className="text-center text-sm text-[#8888aa] mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#6c63ff]">
              Create one →
            </Link>
          </p>
        </div>

        {/* DEMO */}
        <div className="mt-4 bg-[#1a1a24]/60 border border-white/10 rounded-2xl p-4">
          <p className="text-xs text-[#8888aa] mb-2">Demo accounts:</p>

          <div className="space-y-1 text-xs font-mono">
            <div className="text-[#a78bfa]">admin@demo.com / admin123</div>
            <div className="text-[#38bdf8]">user@demo.com / user123</div>
            <div className="text-[#f87171]">super@demo.com / super123</div>
          </div>
        </div>

      </div>
    </div>
  );
}