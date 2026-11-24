import React from "react";

export function WordIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" className={className} fill="none">
      <rect x="2" y="3" width="20" height="18" rx="3" fill="#2B579A" />
      <path d="M5.5 7.5h2l1.6 6.2 1.7-6.2h1.9l1.7 6.2 1.6-6.2h2l-2.6 9h-2l-1.6-5.7-1.6 5.7h-2l-2.7-9z" fill="#fff" />
    </svg>
  );
}

export function ExcelIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" className={className} fill="none">
      <rect x="2" y="3" width="20" height="18" rx="3" fill="#217346" />
      <path d="M7.5 7.5h2.3l2.2 3.3 2.2-3.3h2.3l-3.3 4.5 3.5 4.5h-2.3l-2.4-3.4-2.4 3.4H7.3l3.5-4.5-3.3-4.5z" fill="#fff" />
    </svg>
  );
}

export function GoogleDocsIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" className={className} fill="none">
      <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#4285F4" />
      <path d="M14 2v6h6l-6-6z" fill="#A1C2FA" />
      <rect x="7" y="11" width="10" height="1.5" rx="0.75" fill="#fff" />
      <rect x="7" y="14" width="10" height="1.5" rx="0.75" fill="#fff" />
      <rect x="7" y="17" width="6.5" height="1.5" rx="0.75" fill="#fff" />
    </svg>
  );
}

export function GoogleSheetsIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" className={className} fill="none">
      <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#0F9D58" />
      <path d="M14 2v6h6l-6-6z" fill="#87CEAC" />
      <rect x="7" y="11" width="10" height="7" rx="1" stroke="#fff" strokeWidth="1.4" />
      <line x1="7" y1="14.5" x2="17" y2="14.5" stroke="#fff" strokeWidth="1.2" />
      <line x1="11.5" y1="11" x2="11.5" y2="18" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

export function GoogleDriveIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" className={className} fill="none">
      <path d="M8.5 3.5h7l6 10.5h-7L8.5 3.5z" fill="#FFC107" />
      <path d="M2.5 14l3.5 6h12l3.5-6h-19z" fill="#1976D2" />
      <path d="M8.5 3.5L2.5 14l3.5 6 6-10.5-3.5-6z" fill="#4CAF50" />
    </svg>
  );
}

export function GmailIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" className={className} fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" fill="#fff" />
      <path d="M2 7a3 3 0 0 1 3-3h.5L12 9.5 18.5 4H19a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-1V9.8L12 14.5 6 9.8V20H5a3 3 0 0 1-3-3V7z" fill="#EA4335" />
      <path d="M2 7v10a3 3 0 0 0 3 3h1V9.8L2 7z" fill="#4285F4" />
      <path d="M22 7v10a3 3 0 0 1-3 3h-1V9.8L22 7z" fill="#34A853" />
      <path d="M18.5 4L12 9.5 18 9.8V4h.5z" fill="#FBBC05" />
    </svg>
  );
}

export function HubstaffIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" className={className} fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#2B67F6" />
      <path d="M7.5 6.5h2.4v4.3h4.2V6.5h2.4v11h-2.4v-4.4H9.9v4.4H7.5v-11z" fill="#fff" />
      <circle cx="17.5" cy="7" r="1.5" fill="#38BDF8" />
    </svg>
  );
}

export const toolLogoMap = {
  "ms-word": WordIcon,
  "ms-excel": ExcelIcon,
  "google-docs": GoogleDocsIcon,
  "google-sheets": GoogleSheetsIcon,
  "google-drive": GoogleDriveIcon,
  "gmail": GmailIcon,
  "hubstaff": HubstaffIcon,
};
