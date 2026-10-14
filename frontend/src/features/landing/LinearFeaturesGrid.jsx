import React from "react"
import { Shield, GitCommit, FileCheck, Lock, Cpu, Eye, AlertOctagon, Terminal } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card"
import { Badge } from "../../ui/badge"

export function LinearFeaturesGrid() {
  return (
    <section id="features" className="py-20 border-t border-[#DDD3C9] bg-[#FFFCF8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="stripe" className="mb-3 text-xs font-semibold py-1 px-3">
            Designed for Adversarial Trust
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#302925] font-space">
            Why ScopeFlow differs from generic review bots
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#776F67] leading-relaxed font-dmsans">
            Freelancer platforms lack deep technical verification. Code review bots don't check contractual intent. ScopeFlow connects both under neutrality.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-inter">
          {/* Bento Card 1: Two-Party Signed Spec */}
          <div className="rounded-xl border border-[#DDD3C9] bg-[#F2EEE8]/60 p-6 sm:p-7 space-y-3.5 md:col-span-2 shadow-2xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7A3438]/10 text-[#7A3438] border border-[#7A3438]/20">
              <FileCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#302925] font-manrope">
              Two-Party Signed Acceptance Spec
            </h3>
            <p className="text-sm sm:text-base text-[#776F67] leading-relaxed">
              Every milestone criterion is strictly defined with verification method, severity, and blocking flags. A milestone cannot be funded until both the client and developer explicitly sign the versioned spec hash.
            </p>
            <div className="rounded-md bg-[#FFFCF8] border border-[#DDD3C9] p-3.5 font-mono text-xs text-[#302925] shadow-2xs leading-relaxed">
              <span className="text-[#236B2B] font-bold">spec_hash:</span> sha256:7e8d2c94a5b06f... <br />
              <span className="text-[#7A3438] font-semibold">client_sig:</span> sarahchen [10:14 UTC] · <span className="text-[#7A3438] font-semibold">developer_sig:</span> unknownsideofme [10:18 UTC]
            </div>
          </div>

          {/* Bento Card 2: Neutral Escrow */}
          <div className="rounded-xl border border-[#DDD3C9] bg-[#F2EEE8]/60 p-6 sm:p-7 space-y-3.5 shadow-2xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7A3438]/10 text-[#7A3438] border border-[#7A3438]/20">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#302925] font-manrope">
              Neutral Escrow Gating
            </h3>
            <p className="text-sm sm:text-base text-[#776F67] leading-relaxed">
              Funds are locked before work begins and advance only on verified evidence. Agents recommend; humans approve. No AI can move money unassisted.
            </p>
          </div>

          {/* Bento Card 3: Anti-Gaming Auditor */}
          <div className="rounded-xl border border-[#DDD3C9] bg-[#F2EEE8]/60 p-6 sm:p-7 space-y-3.5 shadow-2xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C28C62]/15 text-[#C28C62] border border-[#C28C62]/30">
              <AlertOctagon className="h-5 w-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#302925] font-manrope">
              Anti-Gaming AST Inspection
            </h3>
            <p className="text-sm sm:text-base text-[#776F67] leading-relaxed">
              Detects skipped assertions, empty test blocks, hard-coded fake payloads, mocked auth bypasses, and disabled CI triggers.
            </p>
          </div>

          {/* Bento Card 4: Mutation Score */}
          <div className="rounded-xl border border-[#DDD3C9] bg-[#F2EEE8]/60 p-6 sm:p-7 space-y-3.5 md:col-span-2 shadow-2xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7A3438]/10 text-[#7A3438] border border-[#7A3438]/20">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#302925] font-manrope">
              Mutation Testing Over Coverage Illusions
            </h3>
            <p className="text-sm sm:text-base text-[#776F67] leading-relaxed">
              Line coverage numbers can easily mislead. ScopeFlow executes mutation testing (via Stryker / mutmut) to ensure tests would actually fail when real bugs are introduced.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
