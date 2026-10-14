import React, { useState } from "react"
import { LandingHeader } from "../features/landing/LandingHeader"
import { HeroSection } from "../features/landing/HeroSection"
import { LinearFeaturesGrid } from "../features/landing/LinearFeaturesGrid"
import { AgentOrbShowcase } from "../features/landing/AgentOrbShowcase"
import { LandingFooter } from "../features/landing/LandingFooter"
import { AuthModal } from "../features/auth/AuthModal"

export function LandingPage({ onEnterWorkspace }) {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState("login")

  const handleOpenAuth = (mode = "login") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const handleLoginSuccess = (role) => {
    onEnterWorkspace(role)
  }

  return (
    <div className="min-h-screen bg-[#F2EEE8] text-[#302925] flex flex-col font-sans selection:bg-[#7A3438]/20 selection:text-[#7A3438]">
      <LandingHeader
        onOpenAuth={handleOpenAuth}
        onOpenWorkspace={() => onEnterWorkspace("client")}
      />

      <main className="flex-1 bg-[#F2EEE8]">
        <HeroSection
          onOpenWorkspace={() => onEnterWorkspace("client")}
          onOpenAuth={handleOpenAuth}
        />
        <LinearFeaturesGrid />
        <AgentOrbShowcase />
      </main>

      <LandingFooter />

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}
