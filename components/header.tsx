"use client";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { YoutubeIcon, Github, Users, LogOut, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Play, Star, BookOpen, BarChart3, Search, Bookmark } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ProfileDialog } from "./pop-up";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu
  const avatarSrc = "/profile.webp";
  const { user } = useUser();

  if (!user) {
    return null; // or render a loading state or skeleton
  }

  return (
    <>
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
       

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg px-4 py-2 shadow-sm border bg-background">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Play className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <Link href="/" className="text-xl font-bold tracking-tight">
              ClassyTube
            </Link>
             
            </div>
          </div>
          

          {/* User Profile, GitHub, and Dashboard */}
          
          <div className="hidden md:flex items-center gap-4">
          
            
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-md px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/80 transition"
              
            >
              Dashboard
            </Link>
            <Link
              href="/course"
              className="flex items-center gap-2 rounded-md px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/80 transition"
            >
              My Course
            </Link>
            <ThemeToggle />
           

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-12 w-12 border-gray ">
                    <AvatarImage src={avatarSrc} alt="User" />
                    <AvatarFallback className=" flex items-center gap-2 bg-gray-200 rounded-lg px-4 py-2 shadow-sm border border-slate-400 text-xl   tracking-tight px-4 py-2  text-black rounded-md hover:bg-gray-200 transition">XY</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarSrc} alt="User" />
                    <AvatarFallback>XY</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium leading-none">
                      {user.fullName || "Anonymous"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress || "No email"}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span className="cursor-pointer">Profile</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-500 p-0">
                  <SignOutButton>
                    <div className="flex items-center w-full px-2 py-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded-md">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="cursor-pointer">Log out</span>
                    </div>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden bg-background p-4 space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/course"
              className="block px-4 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 transition"
            >
              My Course
            </Link>

            <div className="pt-2">
              <ThemeToggle />
            </div>

            {/* Profile Icon for Mobile */}
            <div className="flex justify-center mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src={avatarSrc} alt="User" />
                      <AvatarFallback>XY</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="center">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatarSrc} alt="User" />
                      <AvatarFallback>XY</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium leading-none">
                        {user.fullName || "Anonymous"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.primaryEmailAddress?.emailAddress || "No email"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span className="cursor-pointer">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 p-0">
                    <SignOutButton>
                      <div className="flex items-center w-full px-2 py-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded-md">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span className="cursor-pointer">Log out</span>
                      </div>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        )}
      </header>
      <ProfileDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
