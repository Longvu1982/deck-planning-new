"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/40 border-b border-white/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <div className="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
              Deck Planning
              <div className="absolute right-0 -top-2 bg-clip-text text-xs bg-gradient-to-r from-purple-600 to-cyan-600">
                V2
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/session/create">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 border-0 hover:opacity-90">
                Create Session
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-700 hover:bg-white/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden backdrop-blur-md bg-white/90 border-b border-white/50">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-slate-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-slate-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-slate-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
            </nav>
            <div className="flex flex-col space-y-3">
              <Link
                href="/session/join"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="outline"
                  className="w-full border-white/50 backdrop-blur-sm bg-white/40 hover:bg-white/60 text-slate-700"
                >
                  Join Session
                </Button>
              </Link>
              <Link
                href="/session/create"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 border-0 hover:opacity-90">
                  Create Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
