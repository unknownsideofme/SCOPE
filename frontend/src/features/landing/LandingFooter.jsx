import React from "react"
import { Shield, Heart } from "lucide-react"
import { GithubIcon } from "../../ui/icons"

export function LandingFooter() {
  return (
    <footer className="border-t border-[#DDD3C9] bg-[#EAE3D9]/60 py-12 text-sm text-[#776F67] font-manrope">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#7A3438] text-white">
            <Shield className="h-4 w-4" />
          </div>
          <span className="font-bold text-[#302925] font-space text-base">scope</span>
          <span>· Neutral Milestone Acceptance Platform</span>
        </div>

        <div className="flex items-center space-x-6 text-[#776F67] font-medium">
          <a href="#features" className="hover:text-[#302925] transition-colors">Architecture</a>
          <a href="#agents" className="hover:text-[#302925] transition-colors">Auditors (A1-A8)</a>
          <a href="#orbs" className="hover:text-[#302925] transition-colors">Thinking Orbs</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#302925] flex items-center gap-1.5 transition-colors">
            <GithubIcon className="h-4 w-4" />
            <span>GitHub App</span>
          </a>
        </div>

        <div className="text-xs text-[#776F67]/80 font-mono">
          Built for PayPal AI Hackathon 2026. Non-adversarial verification.
        </div>
      </div>
    </footer>
  )
}
