import React, { useState } from "react"
import { WorkspaceHeader } from "../features/workspace/WorkspaceHeader"
import { ViewTabs } from "../features/workspace/ViewTabs"
import { FilterBar } from "../features/workspace/FilterBar"
import { MilestoneTableView } from "../features/workspace/MilestoneTableView"
import { StatusBoardView } from "../features/workspace/StatusBoardView"
import { RoadmapGanttView } from "../features/workspace/RoadmapGanttView"
import { PaymentsEscrowView } from "../features/workspace/PaymentsEscrowView"
import { MilestoneDetailDrawer } from "../features/workspace/MilestoneDetailDrawer"
import { AgentsLiveAuditModal } from "../features/workspace/AgentsLiveAuditModal"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { mockProject, mockMilestones as initialMilestones } from "../lib/mockData"

export function WorkspacePage({ onBackToLanding, initialRole = "client" }) {
  const [project, setProject] = useState(mockProject)
  const [milestones, setMilestones] = useState(initialMilestones)
  const [activeRole, setActiveRole] = useState(initialRole)
  const [activeView, setActiveView] = useState("backlog")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  // Drawer & modal states
  const [activeDrawerMilestone, setActiveDrawerMilestone] = useState(null)
  const [selectedCriterion, setSelectedCriterion] = useState(null)
  const [isAuditHubOpen, setIsAuditHubOpen] = useState(false)
  const [isAddCriterionOpen, setIsAddCriterionOpen] = useState(false)
  const [targetMilestoneForAdd, setTargetMilestoneForAdd] = useState(null)
  const [newCriterionTitle, setNewCriterionTitle] = useState("")
  const [newCriterionMethod, setNewCriterionMethod] = useState("Automated Test + Istanbul")
  const [successToast, setSuccessToast] = useState("")

  const triggerToast = (msg) => {
    setSuccessToast(msg)
    setTimeout(() => setSuccessToast(""), 3500)
  }

  const handleSelectCriterion = (ms, crit) => {
    setActiveDrawerMilestone(ms)
    setSelectedCriterion(crit)
  }

  const handleAddCriterionPrompt = (ms) => {
    setTargetMilestoneForAdd(ms)
    setIsAddCriterionOpen(true)
  }

  const handleSaveCriterion = (e) => {
    e.preventDefault()
    if (!newCriterionTitle.trim() || !targetMilestoneForAdd) return

    const newCrit = {
      id: `CRIT-${String(Math.floor(Math.random() * 900) + 100)}`,
      num: targetMilestoneForAdd.criteria.length + 1,
      title: newCriterionTitle,
      method: newCriterionMethod,
      severity: "High",
      blocking: true,
      status: "Unverified",
      assignee: activeRole === "freelancer" ? "unknownsideofme" : "sarahchen",
      pr: "#28",
      subIssues: "0/1",
      subIssuesProgress: 0,
      size: "M",
      evidence: null,
    }

    setMilestones((prev) =>
      prev.map((ms) => {
        if (ms.id === targetMilestoneForAdd.id) {
          return {
            ...ms,
            criteria: [...ms.criteria, newCrit],
          }
        }
        return ms
      })
    )

    setNewCriterionTitle("")
    setIsAddCriterionOpen(false)
    triggerToast(`Criterion ${newCrit.id} added and queued for multi-agent testability review.`)
  }

  const handleApproveRelease = () => {
    if (!activeDrawerMilestone) return
    triggerToast(`Milestone funds released: $${(activeDrawerMilestone.amount / 100).toLocaleString()} transferred to freelancer.`)
    setActiveDrawerMilestone(null)
  }

  const handleRequestChanges = () => {
    triggerToast("Change request and criterion feedback submitted to freelancer.")
    setActiveDrawerMilestone(null)
  }

  const handleDispute = () => {
    triggerToast("Dispute opened. Milestone locked; neutral arbitration packet generated.")
    setActiveDrawerMilestone(null)
  }

  return (
    <div className="min-h-screen bg-[#F2EEE8] text-[#302925] flex flex-col font-sans select-none">
      {/* Toast notification banner */}
      {successToast && (
        <div className="fixed top-14 right-6 z-50 rounded-lg border border-[#236B2B]/30 bg-[#236B2B]/10 px-4 py-2.5 text-sm font-semibold text-[#236B2B] shadow-lg backdrop-blur-md animate-in slide-in-from-top-2">
          {successToast}
        </div>
      )}

      {/* Top GitHub-style navigation */}
      <WorkspaceHeader
        project={project}
        activeRole={activeRole}
        onSwitchRole={setActiveRole}
        onBackToLanding={onBackToLanding}
        onOpenAuditHub={() => setIsAuditHubOpen(true)}
      />

      {/* View Tabs Bar matching screenshot */}
      <ViewTabs
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Main View Area */}
      <main className="flex-1 overflow-x-auto bg-[#FFFCF8]">
        {activeView === "backlog" && (
          <MilestoneTableView
            milestones={milestones}
            onSelectCriterion={handleSelectCriterion}
            onAddCriterion={handleAddCriterionPrompt}
            searchQuery={searchQuery}
            activeFilter={activeFilter}
          />
        )}

        {activeView === "board" && (
          <StatusBoardView
            milestones={milestones}
            onSelectCriterion={handleSelectCriterion}
          />
        )}

        {activeView === "roadmap" && (
          <RoadmapGanttView
            milestones={milestones}
            onSelectMilestone={(ms) => {
              setActiveDrawerMilestone(ms)
              setSelectedCriterion(ms.criteria[0])
            }}
          />
        )}

        {activeView === "escrow" && (
          <PaymentsEscrowView
            project={project}
            milestones={milestones}
          />
        )}

        {(activeView === "bugs" || activeView === "review") && (
          <MilestoneTableView
            milestones={milestones}
            onSelectCriterion={handleSelectCriterion}
            onAddCriterion={handleAddCriterionPrompt}
            searchQuery={searchQuery}
            activeFilter={activeView === "bugs" ? "unverified" : "met"}
          />
        )}
      </main>

      {/* Two-Pane Milestone & Evidence Inspection Drawer */}
      {activeDrawerMilestone && (
        <MilestoneDetailDrawer
          milestone={activeDrawerMilestone}
          selectedCriterion={selectedCriterion}
          onClose={() => setActiveDrawerMilestone(null)}
          onApproveRelease={handleApproveRelease}
          onRequestChanges={handleRequestChanges}
          onDispute={handleDispute}
          activeRole={activeRole}
        />
      )}

      {/* Multi-Agent Orchestrator Modal with Thinking Orbs */}
      <AgentsLiveAuditModal
        open={isAuditHubOpen}
        onClose={() => setIsAuditHubOpen(false)}
      />

      {/* Add Acceptance Criterion Dialog */}
      <Dialog open={isAddCriterionOpen} onOpenChange={setIsAddCriterionOpen}>
        <DialogContent onClose={() => setIsAddCriterionOpen(false)} className="max-w-md bg-[#FFFCF8] border-[#DDD3C9] text-[#302925]">
          <DialogHeader>
            <DialogTitle>Add Acceptance Criterion</DialogTitle>
            <DialogDescription>
              Draft a verifiable milestone deliverable for {targetMilestoneForAdd?.title.split(":")[0]}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveCriterion} className="space-y-4 my-3 font-inter">
            <div>
              <label className="text-xs font-semibold text-[#776F67] block mb-1.5">
                Criterion Requirement:
              </label>
              <Input
                value={newCriterionTitle}
                onChange={(e) => setNewCriterionTitle(e.target.value)}
                placeholder="e.g. Ensure tarball integrity verification with SHA-512 checksums"
                required
                className="bg-[#FFFCF8] border-[#DDD3C9] text-sm text-[#302925] h-9"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#776F67] block mb-1.5">
                Verification Method:
              </label>
              <select
                value={newCriterionMethod}
                onChange={(e) => setNewCriterionMethod(e.target.value)}
                className="w-full h-9 rounded-md bg-[#FFFCF8] border border-[#DDD3C9] px-3 text-sm text-[#302925] focus:outline-none focus:ring-2 focus:ring-[#7A3438]/20 focus:border-[#7A3438]"
              >
                <option value="Automated Test + Istanbul">Automated Test + Istanbul (A3)</option>
                <option value="Stryker Mutation Engine">Stryker Mutation Engine (A4)</option>
                <option value="E2E Playwright Journey">E2E Playwright Journey (A5)</option>
                <option value="Anti-Gaming AST Review">Anti-Gaming AST Review (A7)</option>
                <option value="Provenance & Checksum Check">Provenance & Checksum Check (A8)</option>
              </select>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsAddCriterionOpen(false)}
                className="text-sm text-[#776F67] h-9"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="text-sm bg-[#7A3438] hover:bg-[#672B2F] text-white font-semibold h-9 px-4"
              >
                Sign & Add to Spec
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
