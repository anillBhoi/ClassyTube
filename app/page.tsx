"use client"

import type React from "react"
import Link from "next/link"
import { Play, Star, BookOpen, BarChart3, Search, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function LandingPage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900 font-sans overflow-hidden">
      {/* Simple background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40"></div>

      {/* Header */}
      <header className="relative z-10 w-full py-5 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Play className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">ClassyTube</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full bg-white hover:bg-slate-100 border border-slate-200">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.imageUrl} alt="User" />
                    <AvatarFallback>{user.firstName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link href="/sign-in">
                  <Button variant="outline" className="rounded-full px-5 text-slate-700 border-slate-300 hover:bg-slate-100 transition-all">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full px-5 transition-all shadow-md hover:shadow-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6">
        {/* Hero Section - Split layout */}
        <section className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Follow any playlist like a paid course
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Transform YouTube playlists into structured courses with progress tracking, AI-generated assignments, quizzes, and documentation
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={user ? "/dashboard" : "/sign-up"}>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-8 py-4 text-lg font-medium shadow-md hover:shadow-lg transition-all">
                    Start Learning Now
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" className="rounded-full px-8 py-4  text-lg text-slate-700 border-slate-300 hover:bg-slate-100 transition-all flex items-center gap-2">
                    <span>What's more?</span>
                    <BarChart3 className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Right side - Demo images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* First image - Dashboard demo */}
                <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 transform rotate-2 overflow-hidden">
                  <div className="w-full h-64 relative rounded-xl overflow-hidden">
                    {/* Replace this with your actual dashboard image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Play className="h-6 w-6 text-white" fill="currentColor" />
                        </div>
                        <p className="text-sm font-medium text-blue-800">Dashboard Preview</p>
                      </div>
                    </div>
                     <Image src="/demo1.png" alt="Dashboard preview" fill className="object-cover" />
                  </div>
                </div>
                
                {/* Second image - Progress demo */}
                <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 transform -rotate-1 mt-8 overflow-hidden">
                  <div className="w-full h-56 relative rounded-xl overflow-hidden">
                    {/* Replace this with your actual progress tracking image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-xs font-medium text-green-800">Progress Tracking</p>
                      </div>
                    </div>
                    <Image src="/demo2.png" alt="Progress tracking" fill className="object-cover" />
                  </div>
                </div>
                
                {/* Third image - AI features demo */}
                <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 transform rotate-3 col-span-2 overflow-hidden">
                  <div className="w-full h-48 relative rounded-xl overflow-hidden">
                    {/* Replace this with your actual AI features image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Star className="h-7 w-7 text-white" fill="currentColor" />
                        </div>
                        <p className="text-sm font-medium text-purple-800">AI Features</p>
                      </div>
                    </div>
                    <Image src="/demo3.png" alt="AI features" fill className="object-cover" />
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full blur-xl opacity-40 z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-30 z-0"></div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
              Everything you need to learn effectively
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
                  <BookOpen className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Structured Learning Paths</h3>
                <p className="text-slate-600">Turn any YouTube playlist into a organized course with clear milestones and objectives.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-5">
                  <Star className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Progress Tracking</h3>
                <p className="text-slate-600">Monitor your learning journey with visual progress indicators and completion metrics.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
                  <Search className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">AI-Powered Tools</h3>
                <p className="text-slate-600">Get automatic summaries, quizzes, and assignments generated from video content.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-5">
                  <Bookmark className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Save & Organize</h3>
                <p className="text-slate-600">Bookmark your favorite learning content and create personalized collections.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-white rounded-3xl shadow-sm border border-slate-100 mb-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">How LearnTube works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Paste URL</h3>
                <p className="text-slate-600">Copy any YouTube playlist link</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Customize</h3>
                <p className="text-slate-600">Set your learning preferences</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Learn</h3>
                <p className="text-slate-600">Start your structured course</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 py-8 text-center text-slate-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <Play className="h-3 w-3 text-white" fill="currentColor" />
          </div>
          <span className="font-medium text-slate-700">ClassyTube</span>
        </div>
        <p>© {new Date().getFullYear()} ClassyTube. All rights reserved.</p>
      </footer>
    </div>
  )
}