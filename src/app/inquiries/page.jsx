"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Unlock,
  Mail,
  RefreshCw,
  Trash2,
  CheckCircle2,
  Clock,
  Inbox,
  Search,
  ArrowLeft,
  Download,
  Copy,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

export default function InquiriesDashboardPage() {
  const [pin, setPin] = useState("");
  const [savedPin, setSavedPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const fetchInquiries = useCallback(async (activePin) => {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "GET",
        headers: { "x-admin-pin": activePin },
        cache: "no-store",
      });

      if (res.status === 401) {
        setUnlocked(false);
        sessionStorage.removeItem("clariza_inquiries_pin");
        setAuthError("Incorrect passcode. Please try again.");
        setLoading(false);
        return false;
      }

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Failed to load inquiries.");
        setLoading(false);
        return false;
      }

      setInquiries(Array.isArray(data.inquiries) ? data.inquiries : []);
      setSavedPin(activePin);
      setUnlocked(true);
      sessionStorage.setItem("clariza_inquiries_pin", activePin);
      setLoading(false);
      return true;
    } catch {
      setAuthError("Network error while loading inquiries.");
      setLoading(false);
      return false;
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("clariza_inquiries_pin");
    if (stored) {
      fetchInquiries(stored);
    }
  }, [fetchInquiries]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!pin.trim()) return;
    await fetchInquiries(pin.trim());
  };

  const handleLock = () => {
    sessionStorage.removeItem("clariza_inquiries_pin");
    setUnlocked(false);
    setSavedPin("");
    setPin("");
    setInquiries([]);
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": savedPin,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? data.inquiry : item))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this inquiry permanently?"
    );
    if (!confirmed) return;

    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
        headers: { "x-admin-pin": savedPin },
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCopyEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Name", "Email", "Service Needed", "Status", "Message"];
    const escapeCell = (val) => `"${String(val || "").replace(/"/g, '""')}"`;
    const rows = inquiries.map((item) => [
      formatDate(item.createdAt),
      item.name,
      item.email,
      item.serviceNeeded,
      item.status,
      item.message,
    ]);
    const csv = [headers, ...rows].map((r) => r.map(escapeCell).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clariza-inquiries.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  const counts = {
    All: inquiries.length,
    New: inquiries.filter((i) => i.status === "New").length,
    Reviewed: inquiries.filter((i) => i.status === "Reviewed").length,
    Replied: inquiries.filter((i) => i.status === "Replied").length,
  };

  const filtered = inquiries.filter((item) => {
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.serviceNeeded.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const statusBadge = {
    New: "bg-amber-50 text-amber-800 border-amber-200",
    Reviewed: "bg-sky-50 text-sky-800 border-sky-200",
    Replied: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };

  // LOCK SCREEN
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-4 bg-dot-pattern">
        <div className="w-full max-w-md exec-card rounded-3xl p-8 text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-700/30 mx-auto mb-4 relative shadow-md">
            <Image
              src="/clariza.jpg"
              alt="Clariza Diaz Merza"
              fill
              sizes="64px"
              className="object-cover object-top"
            />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Private Admin Inbox</span>
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900">
            Clariza&apos;s Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
            Enter your passcode to view and manage client inquiries.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white text-sm"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-slate-900 hover:bg-teal-700 text-white font-semibold text-sm shadow-md transition-all disabled:opacity-60 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>{loading ? "Checking..." : "Unlock Inquiries Inbox"}</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED DASHBOARD
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 glass-nav border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-700/20 relative shrink-0">
              <Image
                src="/clariza.jpg"
                alt="Clariza Diaz Merza"
                fill
                sizes="40px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                Clariza Diaz Merza — Inquiries Inbox
              </h1>
              <p className="text-xs text-slate-500">
                All client submissions from your portfolio contact form
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </Link>

            <button
              type="button"
              onClick={() => fetchInquiries(savedPin)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-slate-200 hover:border-teal-600 text-slate-700 hover:text-teal-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            {inquiries.length > 0 && (
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleLock}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="exec-card rounded-2xl p-5">
            <span className="text-xs font-semibold text-slate-500 block">
              Total Inquiries
            </span>
            <span className="text-3xl font-extrabold text-slate-900 mt-1 block">
              {counts.All}
            </span>
          </div>
          <div className="exec-card rounded-2xl p-5 border-amber-200/80">
            <span className="text-xs font-semibold text-amber-700 block">
              New / Unread
            </span>
            <span className="text-3xl font-extrabold text-amber-700 mt-1 block">
              {counts.New}
            </span>
          </div>
          <div className="exec-card rounded-2xl p-5 border-sky-200/80">
            <span className="text-xs font-semibold text-sky-700 block">
              Reviewed
            </span>
            <span className="text-3xl font-extrabold text-sky-700 mt-1 block">
              {counts.Reviewed}
            </span>
          </div>
          <div className="exec-card rounded-2xl p-5 border-emerald-200/80">
            <span className="text-xs font-semibold text-emerald-700 block">
              Replied
            </span>
            <span className="text-3xl font-extrabold text-emerald-700 mt-1 block">
              {counts.Replied}
            </span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, service, or message..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-teal-600"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["All", "New", "Reviewed", "Replied"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === tab
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-teal-600/50"
                }`}
              >
                {tab} ({counts[tab]})
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries List */}
        {filtered.length === 0 ? (
          <div className="exec-card rounded-3xl p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {inquiries.length === 0
                ? "No inquiries yet"
                : "No matching inquiries found"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              {inquiries.length === 0
                ? "When a client submits the Contact form on your portfolio, their message will appear right here."
                : "Try clearing your search or choosing a different status filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="exec-card rounded-2xl p-6 transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {item.name}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          statusBadge[item.status] || statusBadge.New
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 border border-teal-200 text-teal-800">
                        {item.serviceNeeded}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                        <Mail className="w-3.5 h-3.5 text-teal-700" />
                        {item.email}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyEmail(item.email, item.id)}
                        className="inline-flex items-center gap-1 text-teal-700 hover:underline font-semibold cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Reply via Email CTA */}
                  <a
                    href={`mailto:${item.email}?subject=${encodeURIComponent(
                      `Re: ${item.serviceNeeded} Inquiry — Clariza Diaz Merza`
                    )}&body=${encodeURIComponent(
                      `Hi ${item.name},\n\nThank you for reaching out regarding ${item.serviceNeeded}.\n\nBest regards,\nClariza Diaz Merza\nAdministrative Virtual Assistant`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors shrink-0"
                  >
                    <span>Reply via Email</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Message Body */}
                <div className="py-4">
                  <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-[#FAF9F6] rounded-xl p-4 border border-slate-200/70">
                    {item.message}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold text-slate-400 mr-1">
                      Mark as:
                    </span>
                    {["New", "Reviewed", "Replied"].map((st) => (
                      <button
                        key={st}
                        type="button"
                        disabled={updatingId === item.id || item.status === st}
                        onClick={() => handleStatusChange(item.id, st)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 ${
                          item.status === st
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={updatingId === item.id}
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
