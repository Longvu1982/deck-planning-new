"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Plus, X } from "lucide-react";

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

          <div className="flex items-center space-x-4">
            <Link href="/session/create">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 border-0 hover:opacity-90">
                <Plus /> <span className="hidden md:block">Create Session</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
