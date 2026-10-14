import React from "react"
import { Shield, ArrowRight, Sparkles } from "lucide-react"
import { GithubIcon } from "../../ui/icons"
import { Button } from "../../ui/button"

export function LandingHeader({ onOpenAuth, onOpenWorkspace }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#DDD3C9] bg-[#FFFCF8]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7A3438] text-white shadow-xs">
            <Shield className="h-4.5 w-4.5" />
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-[#302925] flex items-center gap-2 font-space">
            scope
            <span className="rounded bg-[#EAE3D9] px-2 py-0.5 text-xs font-mono text-[#776F67] font-semibold border border-[#DDD3C9]">
              v1.0
            </span>
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium font-manrope text-[#776F67]">
          <a href="#features" className="hover:text-[#302925] transition-colors">
            Architecture
          </a>
          <a href="#agents" className="hover:text-[#302925] transition-colors">
            Auditing Agents
          </a>
          <a href="#orbs" className="hover:text-[#302925] transition-colors">
            Thinking Orbs
          </a>
          <a href="#contract" className="hover:text-[#302925] transition-colors">
            Two-Party Contract
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenAuth("login")}
            className="text-sm font-manrope font-semibold text-[#776F67] hover:text-[#302925] h-9 px-3.5"
          >
            Log in
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={onOpenWorkspace}
            className="text-sm font-manrope font-semibold bg-[#7A3438] hover:bg-[#672B2F] text-white gap-2 shadow-xs h-9 px-4"
          >
            <span>Open Workspace</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
