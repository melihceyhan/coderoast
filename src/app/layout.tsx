import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeRoast.ai - Where Bad Code Meets Brutal Honesty 🔥",
  description: "Get your code roasted by AI characters! Gordon Ramsay, Yoda, Shakespeare and more will brutally critique your code in the most entertaining way possible.",
  keywords: ["code review", "AI", "roast", "programming", "developer tools", "fun"],
  authors: [{ name: "CodeRoast.ai" }],
  openGraph: {
    title: "CodeRoast.ai - AI Code Roaster",
    description: "Get your code brutally roasted by AI characters!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeRoast.ai - AI Code Roaster 🔥",
    description: "Get your code brutally roasted by AI characters!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-grid scanlines">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
