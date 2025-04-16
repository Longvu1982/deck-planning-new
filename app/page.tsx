"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Users,
  BarChart3,
  Clock,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";
import { FeatureCard } from "@/components/feature-card";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-3xl" />
          <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-200/30 blur-3xl" />
        </div>

        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Agile Estimation Made Easy
              </motion.h1>
              <motion.p
                className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Streamline your planning poker sessions with intuitive, visually
                stunning app. Collaborate in real-time and make consensus-driven
                estimations effortlessly.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/session/create">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 border-0 hover:opacity-90"
                  >
                    Create Session
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="flex-1"
              initial={{
                opacity: 0,
                scale: 0.9,
                rotateY: 0,
                perspective: 200,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 30,
                perspective: 200,
                skew: -5,
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-purple-600/10 to-cyan-600/10 blur-xl" />
                <div className="backdrop-blur-md bg-white/40 border border-white/50 shadow-lg rounded-3xl overflow-hidden">
                  <img
                    src="/preview.png"
                    alt="Poker Planning App Interface"
                    className="w-full h-auto rounded-3xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
              Powerful Features
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Everything you need for efficient and enjoyable planning poker
              sessions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-6 w-6 text-purple-600" />}
              title="Virtual Table Experience"
              description="Gather your team around a virtual table for an immersive planning experience that mimics in-person sessions."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-cyan-600" />}
              title="Visual Vote Analytics"
              description="See colorful charts and visualizations of voting patterns to quickly identify consensus or divergence."
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6 text-emerald-600" />}
              title="Timed Voting"
              description="Set time limits for voting rounds to keep your planning sessions efficient and on schedule."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-amber-600" />}
              title="Real-time Collaboration"
              description="Instantly see when team members have voted and reveal results simultaneously for everyone."
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6 text-rose-600" />}
              title="Spectator Mode"
              description="Allow stakeholders to observe the estimation process without participating in the voting."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-indigo-600" />}
              title="Team Chat"
              description="Discuss estimations in real-time with the integrated chat feature to improve collaboration."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
              How It Works
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-800">
                Create a Session
              </h3>
              <p className="mt-2 text-slate-600">
                Start a new planning poker session and invite your team members
                to join.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-800">
                Vote on Stories
              </h3>
              <p className="mt-2 text-slate-600">
                Each team member selects a card representing their estimation
                for each user story.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-800">
                Reveal & Discuss
              </h3>
              <p className="mt-2 text-slate-600">
                Reveal all votes at once, view the distribution chart, and
                discuss to reach consensus.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
