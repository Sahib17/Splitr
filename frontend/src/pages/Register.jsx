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
import { me, register } from "@/services/authService";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500&display=swap');

        .reg-page { font-family: 'Outfit', sans-serif; }

        @keyframes regFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .reg-card-anim    { animation: regFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .reg-field-anim-1 { animation: regFadeUp 0.55s 0.10s both; }
        .reg-field-anim-2 { animation: regFadeUp 0.55s 0.18s both; }
        .reg-field-anim-3 { animation: regFadeUp 0.55s 0.26s both; }
        .reg-field-anim-4 { animation: regFadeUp 0.55s 0.34s both; }
        .reg-field-anim-5 { animation: regFadeUp 0.55s 0.42s both; }

        .reg-input {
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
        .reg-input::placeholder { color: #4a4d3a !important; }
        .reg-input:focus {
          border-color: rgba(200,241,53,0.5) !important;
          box-shadow: 0 0 0 3px rgba(200,241,53,0.08) !important;
        }

        .reg-btn-submit {
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
        .reg-btn-submit:hover {
          background: #a8d020 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 8px 24px rgba(200,241,53,0.25) !important;
        }

        .reg-btn-login {
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
        .reg-btn-login:hover { opacity: 0.75 !important; }

        .reg-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .reg-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }
        .reg-divider-text {
          font-size: 0.7rem;
          color: #3d4030;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="reg-page min-h-screen bg-[#0e0f0c] flex items-center justify-center p-4 relative overflow-hidden">

        {/* Dot grid */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(200,241,53,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Ambient glow */}
        <div
          className="fixed -top-50 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(200,241,53,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />

        {/* Logo */}
        <Link
          to="/"
          className="fixed top-6 left-8 z-10 flex items-center gap-1.5 no-underline"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: '#f0f2e8', letterSpacing: '-0.03em', textDecoration: 'none' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#c8f135] border border-[#0e0f0c] inline-block mb-0.5" />
          splitr
        </Link>

        {/* Card */}
        <Card className="reg-card-anim w-full max-w-sm relative z-10 border-0 shadow-none bg-transparent my-8">

          {/* Top accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-[#c8f135]/30 to-transparent rounded-full" />

          <div className="bg-[#161810] border border-white/[0.07] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden">

            {/* Header */}
            <CardHeader className="px-7 pt-8 pb-0 gap-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle
                    className="text-[#f0f2e8] text-xl leading-tight"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, letterSpacing: '-0.03em' }}
                  >
                    Join Splitr.
                  </CardTitle>
                  <CardDescription
                    className="text-[#4a4d3a] text-[0.8rem] font-light leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Split fairly. Settle instantly. Stay friends.
                  </CardDescription>
                </div>
                <CardAction className="mt-0.5">
                  <Link to="/login">
                    <Button className="reg-btn-login" variant="link">
                      Log In →
                    </Button>
                  </Link>
                </CardAction>
              </div>
              <div className="mt-5 h-px bg-white/5" />
            </CardHeader>

            {/* Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const response = await register({ name, phone, email, password });
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

                  {/* Name */}
                  <div className="reg-field-anim-1 flex flex-col gap-2">
                    <Label
                      htmlFor="name"
                      className="text-[#8a8d70] text-[0.75rem] font-medium tracking-widest uppercase"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="reg-input"
                    />
                  </div>

                  {/* Email */}
                  <div className="reg-field-anim-2 flex flex-col gap-2">
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
                      placeholder="johndoe@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="reg-input"
                    />
                  </div>

                  {/* Phone */}
                  <div className="reg-field-anim-3 flex flex-col gap-2">
                    <Label
                      htmlFor="phone"
                      className="text-[#8a8d70] text-[0.75rem] font-medium tracking-widest uppercase"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="+1 1234567890"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="reg-input"
                    />
                  </div>

                  {/* Password */}
                  <div className="reg-field-anim-4 flex flex-col gap-2">
                    <Label
                      htmlFor="password"
                      className="text-[#8a8d70] text-[0.75rem] font-medium tracking-widest uppercase"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="reg-input"
                    />
                  </div>

                </div>
              </CardContent>

              <CardFooter className="reg-field-anim-5 flex flex-col gap-3 px-7 pt-6 pb-7">

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
                <Button type="submit" className="reg-btn-submit">
                  Create Account
                </Button>

                {/* Divider */}
                <div className="reg-divider w-full">
                  <div className="reg-divider-line" />
                  <span className="reg-divider-text">or</span>
                  <div className="reg-divider-line" />
                </div>

                {/* Login nudge */}
                <p
                  className="text-[#3d4030] text-[0.75rem] text-center"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#c8f135] hover:opacity-75 transition-opacity font-medium"
                    style={{ textDecoration: 'none' }}
                  >
                    Sign in
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

export default Register;