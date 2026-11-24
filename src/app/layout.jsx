import "./globals.css";

export const metadata = {
  title: "Clariza Diaz Merza | Administrative Virtual Assistant",
  description:
    "Portfolio of Clariza Diaz Merza — Administrative Virtual Assistant offering reliable administrative support, document preparation, spreadsheet maintenance, file organization, email support, and invoicing.",
  keywords: [
    "Clariza Diaz Merza",
    "Clariza Merza",
    "Administrative Virtual Assistant",
    "Virtual Assistant Philippines",
    "Invoicing Support",
    "Data Entry",
    "Hubstaff",
    "Google Workspace",
    "Microsoft Office",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans antialiased selection:bg-teal-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
