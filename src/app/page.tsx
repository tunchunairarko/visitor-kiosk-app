import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { UserPlus, UserMinus, Clock, Building2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import CompanyLogo from "../components/CompanyLogo";

export const metadata: Metadata = {
  title: "Visitor Kiosk - Welcome",
  description:
    "Welcome to the Visitor Kiosk system. Easily check in and check out visitors with our intuitive interface.",
  keywords: [
    "visitor kiosk",
    "check in",
    "check out",
    "visitor management",
    "reception",
    "visitor tracking",
  ],
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white/60 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <div className="flex justify-center mb-6">
              <CompanyLogo size={120} className="animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Our Office
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-2">
              We&apos;re delighted to have you here today!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Check In Card */}
          <Link href="/check-in">
            <Card className="bg-blue-950 hover:bg-blue-800 shadow-xl border-0 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform group">
              <CardHeader className="text-center py-12">
                <div className="mx-auto bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors duration-300">
                  <UserPlus className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-white mb-4">
                  Check In
                </CardTitle>
                <p className="text-white text-lg">
                  Register your arrival and let us know you&apos;re here
                </p>
              </CardHeader>
            </Card>
          </Link>

          {/* Check Out Card */}
          <Link href="/check-out">
            <Card className="bg-sky-600 hover:bg-sky-500 shadow-xl border-0 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform group">
              <CardHeader className="text-center py-12">
                <div className="mx-auto bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors duration-300">
                  <UserMinus className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-white mb-4">
                  Check Out
                </CardTitle>
                <p className="text-white text-lg">
                  Register your departure when leaving our premises
                </p>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">
                  Quick &amp; Easy Process
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <UserPlus className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Secure Registration</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Building2 className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium">
                  Professional Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-gray-500">
            <p>© 2025 Visitor Kiosk System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
