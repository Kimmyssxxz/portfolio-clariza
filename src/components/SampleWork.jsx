"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import Reveal3D from "@/components/Reveal3D";
import {
  FileSpreadsheet,
  Mail,
  CheckSquare,
  Square,
  Sparkles,
  Info,
  Copy,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

export default function SampleWork() {
  const { sampleWork } = portfolioData;
  const [activeTab, setActiveTab] = useState("invoice");

  // Interactive Invoice State
  const [invoices, setInvoices] = useState(sampleWork.invoiceTracker);
  const [statusFilter, setStatusFilter] = useState("All");

  // Interactive Email Copy State
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState([0, 1]);

  const cycleInvoiceStatus = (id) => {
    const order = ["Paid", "Pending", "Overdue"];
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv;
        const nextStatus = order[(order.indexOf(inv.status) + 1) % order.length];
        return { ...inv, status: nextStatus };
      })
    );
  };

  const parseAmount = (str) => parseFloat(str.replace(/[^0-9.]/g, "")) || 0;
  const totalAmount = invoices.reduce((sum, i) => sum + parseAmount(i.amount), 0);
  const paidAmount = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + parseAmount(i.amount), 0);
  const pendingAmount = invoices
    .filter((i) => i.status === "Pending")
    .reduce((sum, i) => sum + parseAmount(i.amount), 0);
  const overdueAmount = invoices
    .filter((i) => i.status === "Overdue")
    .reduce((sum, i) => sum + parseAmount(i.amount), 0);

  const filteredInvoices =
    statusFilter === "All"
      ? invoices
      : invoices.filter((inv) => inv.status === statusFilter);

  const handleCopyEmailTemplate = () => {
    const text = `Subject: ${sampleWork.adminEmail.subject}\n\n${sampleWork.adminEmail.greeting}\n\n${sampleWork.adminEmail.body}\n\n${sampleWork.adminEmail.closing}\n\n${sampleWork.adminEmail.signature}`;
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const toggleCheck = (idx) => {
    setCheckedItems((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const progressPercent = Math.round(
    (checkedItems.length / sampleWork.checklist.length) * 100
  );

  const tabs = [
    { id: "invoice", label: "01. Invoice Tracker", icon: FileSpreadsheet },
    { id: "email", label: "02. Admin Email", icon: Mail },
    { id: "checklist", label: "03. Task Checklist", icon: CheckSquare },
  ];

  const statusStyles = {
    Paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25",
    Pending: "bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25",
    Overdue: "bg-rose-500/15 text-rose-300 border-rose-500/30 hover:bg-rose-500/25",
  };

  return (
    <section id="samples" className="py-20 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal3D>
        {/* High-Contrast Dark Executive Showcase Box */}
        <div className="rounded-[2.25rem] bg-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl shadow-slate-900/20 border border-slate-800 relative overflow-hidden">
          {/* Subtle glow accents */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-teal-500/15 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Demo</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                See My Work{" "}
                <span className="font-editorial italic font-normal text-teal-300">
                  In Action.
                </span>
              </h2>
              <p className="text-slate-400 text-sm max-w-lg mt-2">
                Click around these interactive templates to preview how I organize trackers, emails, and checklists.
              </p>

              {/* Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-7 p-1.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-teal-600 text-white shadow-md shadow-teal-900/40"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Panel with 3D Tab Pop-In */}
            <div
              key={activeTab}
              className="animate-tab-3d rounded-2xl bg-slate-950/75 border border-slate-800 p-5 sm:p-7"
            >
              {/* TAB 1: INTERACTIVE INVOICE TRACKER */}
              {activeTab === "invoice" && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Interactive Invoice Tracker
                      </h3>
                      <p className="text-xs text-slate-400">
                        Tip: Click any status badge below to toggle Paid / Pending / Overdue and watch totals update live.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {["All", "Paid", "Pending", "Overdue"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setStatusFilter(status)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                            statusFilter === status
                              ? "bg-teal-600 text-white"
                              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Totals Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5">
                      <span className="text-[11px] text-slate-400 block">Total Tracked</span>
                      <span className="text-lg font-bold text-white">${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="rounded-xl bg-emerald-950/40 border border-emerald-500/20 p-3.5">
                      <span className="text-[11px] text-emerald-300/80 block">Paid</span>
                      <span className="text-lg font-bold text-emerald-400">${paidAmount.toFixed(2)}</span>
                    </div>
                    <div className="rounded-xl bg-amber-950/40 border border-amber-500/20 p-3.5">
                      <span className="text-[11px] text-amber-300/80 block">Pending</span>
                      <span className="text-lg font-bold text-amber-400">${pendingAmount.toFixed(2)}</span>
                    </div>
                    <div className="rounded-xl bg-rose-950/40 border border-rose-500/20 p-3.5">
                      <span className="text-[11px] text-rose-300/80 block">Overdue</span>
                      <span className="text-lg font-bold text-rose-400">${overdueAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] tracking-wider">
                        <tr>
                          <th className="py-3 px-4 font-semibold">Invoice ID</th>
                          <th className="py-3 px-4 font-semibold">Client</th>
                          <th className="py-3 px-4 font-semibold">Issue Date</th>
                          <th className="py-3 px-4 font-semibold">Amount</th>
                          <th className="py-3 px-4 font-semibold">Status (Click)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 bg-slate-950/50">
                        {filteredInvoices.map((row) => (
                          <tr
                            key={row.id}
                            className="hover:bg-slate-900/60 transition-colors"
                          >
                            <td className="py-3.5 px-4 font-mono font-semibold text-teal-300">
                              {row.id}
                            </td>
                            <td className="py-3.5 px-4 text-slate-200 font-medium">
                              {row.client}
                            </td>
                            <td className="py-3.5 px-4 text-slate-400">{row.date}</td>
                            <td className="py-3.5 px-4 text-white font-semibold">
                              {row.amount}
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                type="button"
                                onClick={() => cycleInvoiceStatus(row.id)}
                                title="Click to toggle status"
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                                  statusStyles[row.status]
                                }`}
                              >
                                {row.status}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: GMAIL-STYLE ADMIN EMAIL */}
              {activeTab === "email" && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Professional Follow-Up Email
                      </h3>
                      <p className="text-xs text-slate-400">
                        Clear, courteous, and action-oriented client communication.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmailTemplate}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Template</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Mock Email Client Window */}
                  <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-inner">
                    <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        Gmail • Draft Preview
                      </span>
                    </div>
                    <div className="px-5 py-3 border-b border-slate-800/80 text-xs sm:text-sm flex items-center gap-2">
                      <span className="text-slate-500 font-semibold">Subject:</span>
                      <span className="text-white font-semibold">
                        {sampleWork.adminEmail.subject}
                      </span>
                    </div>
                    <div className="p-5 sm:p-6 space-y-4 text-sm text-slate-300 leading-relaxed">
                      <p>{sampleWork.adminEmail.greeting}</p>
                      <p>{sampleWork.adminEmail.body}</p>
                      <p>{sampleWork.adminEmail.closing}</p>
                      <p className="whitespace-pre-line text-teal-300 font-medium pt-1">
                        {sampleWork.adminEmail.signature}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: INTERACTIVE CHECKLIST WITH PROGRESS BAR */}
              {activeTab === "checklist" && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Document & Task Quality Checklist
                      </h3>
                      <p className="text-xs text-slate-400">
                        Click each step below to test my accuracy workflow.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-teal-300 font-mono">
                        {progressPercent}% Complete
                      </span>
                      <button
                        type="button"
                        onClick={() => setCheckedItems([])}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Reset checklist"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden mb-5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {progressPercent === 100 && (
                    <div className="mb-4 px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>All 5 quality checks verified — ready for client delivery!</span>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {sampleWork.checklist.map((item, idx) => {
                      const isChecked = checkedItems.includes(idx);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleCheck(idx)}
                          className={`w-full text-left p-4 rounded-xl border flex items-start gap-3.5 transition-all cursor-pointer ${
                            isChecked
                              ? "bg-teal-950/35 border-teal-500/40"
                              : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span
                              className={`text-sm font-semibold block ${
                                isChecked
                                  ? "text-teal-200 line-through"
                                  : "text-white"
                              }`}
                            >
                              {item.task}
                            </span>
                            <span className="text-xs text-slate-400">
                              {item.detail}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Transparent Note */}
            <div className="mt-6 flex items-start justify-center gap-2 text-xs text-slate-400 text-center max-w-2xl mx-auto">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-500" />
              <p>{sampleWork.disclaimer}</p>
            </div>
          </div>
        </div>
        </Reveal3D>
      </div>
    </section>
  );
}
