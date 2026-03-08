import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/useAuth";
import { login, me } from "@/services/authService";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  console.log("API URL:", import.meta.env.VITE_API_URL);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500&display=swap');

        .login-page {
          font-family: 'Outfit', sans-serif;
        }

        @keyframes loginFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loginFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes loginShimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        .login-card-anim    { animation: loginFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .login-field-anim-1 { animation: loginFadeUp 0.55s 0.15s both; }
        .login-field-anim-2 { animation: loginFadeUp 0.55s 0.25s both; }
        .login-field-anim-3 { animation: loginFadeUp 0.55s 0.35s both; }

        .login-input {
          background: #1a1c17 !important;
          border: 1.5px solid rgba(255,255,255,0.08) !important;
          color: #f0f2e8 !important;
          font-family: 'Outfit', sans-serif !important;
          font-size: 0.9rem !important;
          border-radius: 10px !important;
          padding: 0.65rem 0.9rem !important;
          transition: border-color 0.2s, box-shadow 0.2s !important;
          outline: none !important;
          width: 100% !important;
        }
        .login-input::placeholder { color: #4a4d3a !important; }
        .login-input:focus {
          border-color: rgba(200,241,53,0.5) !important;
          box-shadow: 0 0 0 3px rgba(200,241,53,0.08) !important;
        }

        .login-btn-submit {
          background: #c8f135 !important;
          color: #0e0f0c !important;
          font-family: 'Syne', sans-serif !important;
          font-weight: 700 !important;
          font-size: 0.9rem !important;
          border-radius: 999px !important;
          border: none !important;
          padding: 0.7rem 1.5rem !important;
          width: 100% !important;
          transition: all 0.2s !important;
          letter-spacing: 0.01em !important;
        }
        .login-btn-submit:hover {
          background: #a8d020 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 8px 24px rgba(200,241,53,0.25) !important;
        }

        .login-btn-register {
          background: transparent !important;
          color: #c8f135 !important;
          font-family: 'Outfit', sans-serif !important;
          font-weight: 500 !important;
          font-size: 0.82rem !important;
          padding: 0.3rem 0.6rem !important;
          border: none !important;
          text-decoration: none !important;
          transition: opacity 0.2s !important;
        }
        .login-btn-register:hover { opacity: 0.75 !important; }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0.25rem 0;
        }
        .login-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }
        .login-divider-text {
          font-size: 0.7rem;
          color: #3d4030;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>

      {/* Full-page wrapper */}
      <div className="login-page min-h-screen bg-[#0e0f0c] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background dot grid */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(200,241,53,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient glow */}
        <div
          className="fixed -top-50 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(200,241,53,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Logo — top left */}
        <Link
          to="/"
          className="fixed top-6 left-8 flex items-center gap-1.5 z-10 no-underline"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.3rem",
            color: "#f0f2e8",
            letterSpacing: "-0.03em",
            textDecoration: "none",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#c8f135] border border-[#0e0f0c] inline-block mb-0.5" />
          splitr
        </Link>

        {/* Card */}
        <Card className="login-card-anim w-full max-w-sm relative z-10 border-0 shadow-none bg-transparent">
          {/* Decorative top accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-[#c8f135]/30 to-transparent rounded-full" />

          <div className="bg-[#161810] border border-white/[0.07] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Card header */}
            <CardHeader className="px-7 pt-8 pb-0 gap-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle
                    className="text-[#f0f2e8] text-xl leading-tight"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Welcome back.
                  </CardTitle>
                  <CardDescription
                    className="text-[#4a4d3a] text-[0.8rem] font-light leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Sign in to see who owes you money.
                  </CardDescription>
                </div>
                <CardAction className="mt-0.5">
                  <Link to="/register">
                    <Button className="login-btn-register" variant="link">
                      Register →
                    </Button>
                  </Link>
                </CardAction>
              </div>

              {/* Thin separator */}
              <div className="mt-5 h-px bg-white/5" />
            </CardHeader>

            {/* Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const response = await login({ email, password });
                  if (!response.success) {
                    setError(response.message);
                    return;
                  }

                  const meRes = await me();
                  setUser(meRes.data);
                  navigate("/dashboard");
                } catch (err) {
                  setError(err.response?.data?.message || "Server error");
                }
              }}
            >
              <CardContent className="px-7 pt-6 pb-0">
                <div className="flex flex-col gap-5">
                  {/* Email */}
                  <div className="login-field-anim-1 flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="text-[#8a8d70] text-[0.75rem] font-medium tracking-widest uppercase"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="login-input"
                    />
                  </div>

                  {/* Password */}
                  <div className="login-field-anim-2 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-[#8a8d70] text-[0.75rem] font-medium tracking-widest uppercase"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        Password
                      </Label>
                      <a
                        href="#"
                        className="text-[0.72rem] text-[#4a4d3a] hover:text-[#c8f135] transition-colors duration-200 underline-offset-4 hover:underline"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        Forgot?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="login-input"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="login-field-anim-3 flex flex-col gap-3 px-7 pt-6 pb-7">
                {/* Error */}
                {error && (
                  <Alert
                    variant="destructive"
                    className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-[0.8rem] rounded-xl px-4 py-3 w-full"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <span className="text-base">⚠</span>
                    {error}
                  </Alert>
                )}

                {/* Submit */}
                <Button type="submit" className="login-btn-submit">
                  Sign In
                </Button>

                {/* Divider */}
                <div className="login-divider w-full">
                  <div className="login-divider-line" />
                  <span className="login-divider-text">or</span>
                  <div className="login-divider-line" />
                </div>

                {/* Register nudge */}
                <p
                  className="text-[#3d4030] text-[0.75rem] text-center"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  No account yet?{" "}
                  <Link
                    to="/register"
                    className="text-[#c8f135] hover:opacity-75 transition-opacity font-medium ml-2"
                    style={{ textDecoration: "none" }}
                  >
                    Create one free
                  </Link>
                </p>
              </CardFooter>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
