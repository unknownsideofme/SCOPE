import React, { useState } from "react"
import { ShieldCheck, ArrowUpRight, CheckCircle2, Lock, DollarSign, Receipt, CreditCard } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { MoneyText } from "../../patterns/MoneyText"
import { HashChip } from "../../patterns/HashChip"

export function PaymentsEscrowView({ project, milestones }) {
  return (
    <div className="p-4 sm:p-6 bg-[#F2EEE8] min-h-[500px] space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-[#FFFCF8] border-[#DDD3C9] shadow-2xs">
          <CardHeader className="pb-2">
            <span className="text-xs sm:text-sm text-[#776F67] font-semibold">Total Project Contract</span>
            <CardTitle className="text-xl sm:text-2xl mt-1">
              <MoneyText amountInCents={project.totalBudget} size="xl" className="text-[#302925]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#776F67]">Across 3 milestones in signed contract</p>
          </CardContent>
        </Card>

        <Card className="bg-[#FFFCF8] border-[#DDD3C9] shadow-2xs">
          <CardHeader className="pb-2">
            <span className="text-xs sm:text-sm text-[#776F67] font-semibold">Locked in Neutral Escrow</span>
            <CardTitle className="text-xl sm:text-2xl mt-1">
              <MoneyText amountInCents={project.escrowFunded} size="xl" className="text-[#236B2B]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#776F67]">Secured via PayPal / Stripe sandbox vault</p>
          </CardContent>
        </Card>

        <Card className="bg-[#FFFCF8] border-[#DDD3C9] shadow-2xs">
          <CardHeader className="pb-2">
            <span className="text-xs sm:text-sm text-[#776F67] font-semibold">Released Upon Acceptance</span>
            <CardTitle className="text-xl sm:text-2xl mt-1">
              <MoneyText amountInCents={project.releasedAmount} size="xl" className="text-[#7A3438]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#776F67]">Milestone 1 successfully verified & paid</p>
          </CardContent>
        </Card>
      </div>

      {/* Escrow Gating Summary */}
      <div className="rounded-xl border border-[#DDD3C9] bg-[#FFFCF8] p-5 space-y-4 shadow-2xs font-inter">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#DDD3C9]">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-space text-[#302925]">Escrow State Machine</h3>
            <p className="text-sm text-[#776F67] mt-0.5 font-dmsans">
              Funds are never released by an AI recommendation alone. Release requires verified criteria evidence plus client sign-off.
            </p>
          </div>
          <Badge variant="met" className="gap-1.5 font-mono text-xs py-1 px-3">
            <ShieldCheck className="h-4 w-4 text-[#236B2B]" />
            Audit Gated
          </Badge>
        </div>

        {/* Milestone payment rows */}
        <div className="space-y-3">
          {milestones.map((ms, idx) => (
            <div
              key={ms.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-[#DDD3C9] bg-[#F2EEE8]/50 p-4 text-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAE3D9] font-mono text-xs font-bold text-[#302925]">
                  {idx + 1}
                </div>
                <div>
                  <div className="font-semibold text-[#302925]">{ms.title}</div>
                  <div className="text-[11px] text-[#776F67]">Status: {ms.status} ({ms.progress}% audited)</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MoneyText amountInCents={ms.amount} className="text-[#302925] font-semibold" />
                {ms.progress === 100 ? (
                  <Badge variant="met">Released</Badge>
                ) : (
                  <Badge variant="outline">Locked in Escrow</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
