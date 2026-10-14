import React, { useState } from "react"
import { Shield, Mail, ArrowRight, User, Briefcase, CheckCircle2 } from "lucide-react"
import { GithubIcon } from "../../ui/icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Badge } from "../../ui/badge"

export function AuthModal({ open, onClose, defaultMode = "login", onLoginSuccess }) {
  const [mode, setMode] = useState(defaultMode)
  const [role, setRole] = useState("client")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onLoginSuccess?.(role)
      onClose?.()
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-md bg-[#FFFCF8] border-[#DDD3C9] p-6 text-[#302925] shadow-xl">
        <DialogHeader className="text-center sm:text-center items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7A3438] text-white shadow-xs mb-2">
            <Shield className="h-5 w-5" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-[#302925] font-space">
            {mode === "login" ? "Welcome back to scope" : "Create your Scope account"}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#776F67] font-dmsans">
            {mode === "login"
              ? "Sign in to inspect project milestones and evidence bundles."
              : "Connect your GitHub organization or funding wallet."}
          </DialogDescription>
        </DialogHeader>

        {/* Role Selection */}
        <div className="my-4 space-y-2 font-inter">
          <label className="text-xs font-semibold text-[#776F67]">Select your active role:</label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setRole("client")}
              className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                role === "client"
                  ? "border-[#7A3438] bg-[#7A3438]/10 text-[#7A3438] shadow-2xs font-semibold"
                  : "border-[#DDD3C9] bg-[#FFFCF8] text-[#776F67] hover:text-[#302925] hover:bg-[#F2EEE8]"
              }`}
            >
              <Briefcase className="h-4.5 w-4.5 text-[#7A3438]" />
              <div className="text-left">
                <div className="text-sm font-bold text-[#302925] font-manrope">Client</div>
                <div className="text-xs text-[#776F67]">Fund & Approve</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole("freelancer")}
              className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                role === "freelancer"
                  ? "border-[#7A3438] bg-[#7A3438]/10 text-[#7A3438] shadow-2xs font-semibold"
                  : "border-[#DDD3C9] bg-[#FFFCF8] text-[#776F67] hover:text-[#302925] hover:bg-[#F2EEE8]"
              }`}
            >
              <User className="h-4.5 w-4.5 text-[#C28C62]" />
              <div className="text-left">
                <div className="text-sm font-bold text-[#302925] font-manrope">Freelancer</div>
                <div className="text-xs text-[#776F67]">Build & Submit</div>
              </div>
            </button>
          </div>
        </div>

        {/* Social GitHub App Auth */}
        <div className="space-y-3.5 font-inter">
          <Button
            variant="outline"
            className="w-full h-10 border-[#DDD3C9] bg-[#FFFCF8] hover:bg-[#F2EEE8] text-sm font-manrope font-semibold text-[#302925] gap-2.5 shadow-2xs cursor-pointer"
            onClick={() => {
              onLoginSuccess?.(role)
              onClose?.()
            }}
          >
            <GithubIcon className="h-4.5 w-4.5 text-[#302925]" />
            <span>Continue with GitHub App</span>
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DDD3C9]" />
            </div>
            <span className="relative bg-[#FFFCF8] px-3 text-xs uppercase font-mono text-[#776F67] font-semibold">
              or magic link
            </span>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              className="h-10 bg-[#FFFCF8] text-sm border-[#DDD3C9] text-[#302925] placeholder:text-[#776F67]"
            />
            <Button
              type="submit"
              disabled={submitted}
              className="w-full h-10 bg-[#7A3438] hover:bg-[#672B2F] text-sm font-manrope font-semibold text-white shadow-xs cursor-pointer"
            >
              {submitted ? "Authenticating..." : "Send Secure Sign-in Link"}
            </Button>
          </form>
        </div>

        {/* Switch mode */}
        <div className="mt-4 text-center text-xs sm:text-sm text-[#776F67]">
          {mode === "login" ? (
            <span>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-[#7A3438] hover:underline font-bold cursor-pointer"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-[#7A3438] hover:underline font-bold cursor-pointer"
              >
                Log in
              </button>
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
