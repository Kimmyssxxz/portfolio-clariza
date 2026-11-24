"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default function Contact() {
  const { personal } = portfolioData;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    serviceNeeded: "Document & Data Entry",
    message: "",
  });

  const [copiedField, setCopiedField] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const serviceOptions = [
    "Document & Data Entry",
    "File Organization",
    "Email & Inbox Support",
    "Invoice Tracking Support",
    "General Admin VA",
  ];

  const handleCopy = (value, field) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Unable to send inquiry. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch {
      setErrorMsg("Network error. Please try again or email Clariza directly.");
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Let&apos;s Connect</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ready to Keep Your Operations{" "}
            <span className="font-editorial italic font-normal text-teal-700">
              Organized?
            </span>
          </h2>
          <p className="text-slate-600 text-sm max-w-md mt-2">
            Open to supporting local businesses and international clients remotely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Contact Card */}
          <div className="lg:col-span-5 exec-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Direct Contact
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Click the copy icon or reach out directly via email or mobile.
            </p>

            {/* Email */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/80">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    Email
                  </span>
                  <a
                    href={personal.social.email}
                    className="text-sm font-bold text-slate-900 hover:text-teal-700 transition-colors truncate block"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(personal.email, "email")}
                className="p-2 rounded-xl bg-white border border-slate-200 hover:border-teal-600 text-slate-600 hover:text-teal-700 transition-colors shrink-0 ml-2 cursor-pointer"
                title="Copy Email"
              >
                {copiedField === "email" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    Mobile
                  </span>
                  <a
                    href={personal.social.phone}
                    className="text-sm font-bold text-slate-900 hover:text-teal-700 transition-colors"
                  >
                    {personal.phone}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(personal.phone, "phone")}
                className="p-2 rounded-xl bg-white border border-slate-200 hover:border-teal-600 text-slate-600 hover:text-teal-700 transition-colors shrink-0 ml-2 cursor-pointer"
                title="Copy Mobile Number"
              >
                {copiedField === "phone" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Location
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {personal.location}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Live Inquiry Form (Saves to Clariza's Inquiries Dashboard) */}
          <div className="lg:col-span-7 exec-card rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Inquiry Sent, {formState.name}!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Your message has been delivered to Clariza Diaz Merza&apos;s inbox. She will reply to{" "}
                  <span className="font-semibold text-teal-700">{formState.email}</span> shortly.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        serviceNeeded: "Document & Data Entry",
                        message: "",
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-slate-900 hover:bg-teal-700 text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Send an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="Your name or company"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    How Can I Help?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setFormState({ ...formState, serviceNeeded: opt })
                        }
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          formState.serviceNeeded === opt
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-[#FAF9F6] border border-slate-200 text-slate-600 hover:border-teal-600/50 hover:text-slate-900"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Share a quick note about the tasks, tools, or schedule..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white text-sm resize-none transition-colors"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-slate-900 hover:bg-teal-700 text-white font-semibold text-sm shadow-lg shadow-slate-900/15 hover:shadow-teal-900/20 transition-all disabled:opacity-60 cursor-pointer"
                >
                  <span>{submitting ? "Sending Inquiry..." : "Send Inquiry"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
