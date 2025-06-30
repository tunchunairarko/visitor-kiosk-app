import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import SystemClock from "../components/SystemClock";
import Link from "next/link";
import { Settings } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visitor Kiosk",
  description: "Visitor check-in and management system",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  Visitor Kiosk
                </h1>
              </div>
              <div className="flex flex-row items-center justify-between gap-2">
                <SystemClock />
                <Link href="/admin">
                  <Settings 
                    className="h-6 w-6 text-blue-600 hover:text-blue-900 transition-colors duration-200"
                    aria-label="Admin Settings"
                  />
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
