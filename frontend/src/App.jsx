import React, { useState, useEffect } from "react"
import { LandingPage } from "./pages/LandingPage"
import { WorkspacePage } from "./pages/WorkspacePage"

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.hash === "#workspace" ? "workspace" : "landing"
  })
  const [activeRole, setActiveRole] = useState("client")

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#workspace") {
        setCurrentPage("workspace")
      } else {
        setCurrentPage("landing")
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navigateToWorkspace = (role = "client") => {
    setActiveRole(role)
    window.location.hash = "#workspace"
    setCurrentPage("workspace")
  }

  const navigateToLanding = () => {
    window.location.hash = "#"
    setCurrentPage("landing")
  }

  return (
    <div className="bg-[#F2EEE8] min-h-screen text-[#302925] antialiased selection:bg-[#7A3438]/20 selection:text-[#7A3438]">
      {currentPage === "landing" ? (
        <LandingPage onEnterWorkspace={navigateToWorkspace} />
      ) : (
        <WorkspacePage
          onBackToLanding={navigateToLanding}
          initialRole={activeRole}
        />
      )}
    </div>
  )
}
