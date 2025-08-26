"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"; // Import Clerk'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { VideoList } from "@/components/video-list"
import { PlaylistStats } from "@/components/playlist-stats"
import { RefreshCw, Edit, Trash2, Share2, BookOpen, Youtube } from "lucide-react"
import { fetchPlaylistDetails, type YouTubePlaylist } from "@/lib/youtube-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal";

import { AchievementCard } from "./achievement";
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Users } from "lucide-react"
import { VideoModal } from "./playvideos";

export function PlaylistDashboard() {
  const {user}=useUser();
  const [playlistUrl, setPlaylistUrl] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<YouTubePlaylist | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null)
  const [isAchievementOpen,setIsAchievementOpen]=useState(false);
  const [completedVideos, setCompletedVideos] = useState(0); // State for completed videos

  // useEffect(() => {
  //   const storedPlaylist = localStorage.getItem("userPlaylists");
  //   if (storedPlaylist) {
  //     const parsedPlaylist = JSON.parse(storedPlaylist);
  //     setCurrentPlaylist(parsedPlaylist);
  //     setPlaylistUrl(parsedPlaylist.url || "");
  //   }
  // }, []);

  const openModal = (videoId:string,url: string) => {
    setCurrentVideoUrl(url);
    setIsModalOpen(true);
    setCurrentVideoId(videoId);
  };
  const handleShareProgress = () => {
    setIsAchievementOpen(true); // Open the AchievementCard overlay
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistUrl) return;
  
    setIsLoading(true);
    setError(null);
  
    try {
      // Extract playlist ID from URL
      const playlistId = extractPlaylistId(playlistUrl);

  
      if (!playlistId) {
        throw new Error("Invalid YouTube playlist URL");
      }
  
      // Fetch playlist details
      const playlist = await fetchPlaylistDetails(playlistId);
      const normalizedPlaylist = {
        ...playlist,
        videos: playlist.videos.map((video) => ({
          ...video,
          completed: video.completed ?? false, // Default to `false` if `undefined`
        })),
      };
  
      setCurrentPlaylist(normalizedPlaylist);
  
      // Retrieve existing playlists from localStorage
      let existingPlaylists = JSON.parse(localStorage.getItem("userPlaylists") || "[]");
      
      if (!Array.isArray(existingPlaylists)) {
        console.warn("Invalid data in localStorage, resetting to an empty array.");
        existingPlaylists = [];
      }
      // Check if the playlist already exists to avoid duplicates
      const isDuplicate = existingPlaylists.some((p: any) => p.id === normalizedPlaylist.id);
      if (isDuplicate) {
        throw new Error("This playlist is already saved.");
      }
  
      // Append the new playlist to the array
      const updatedPlaylists = [...existingPlaylists, normalizedPlaylist];
      console.log(updatedPlaylists);
  
      // Save the updated array back to localStorage
      localStorage.setItem("userPlaylists", JSON.stringify(updatedPlaylists));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load playlist");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgressUpdate = (completed: number) => {
    setCompletedVideos(completed); // Update completed videos count
  };

  const handleReset = () => {
    setCurrentPlaylist(null)
    setPlaylistUrl("")
    setCompletedVideos(0); // Reset completed videos count
  }

  function extractPlaylistId(url: string): string | null {
    try {
      const urlObj = new URL(url)

      // Handle different YouTube URL formats
      if (urlObj.hostname.includes("youtube.com")) {
        // Format: https://www.youtube.com/playlist?list=PLAYLIST_ID
        const playlistId = urlObj.searchParams.get("list")
        if (playlistId) return playlistId
      }

      // If it's already just an ID
      if (/^[A-Za-z0-9_-]{10,}$/.test(url)) {
        return url
      }

      return null
    } catch (error) {
      return null
    }
  }

  

  return (
    <div className="container mx-auto px-8 py-12">
      {!currentPlaylist ? (
        <div className="max-w-3xl mx-auto">

          <Card className="bg-card border border-border overflow-hidden">
            <div className="bg-accent p-6 text-accent-foreground">
              <h1 className="text-3xl font-bold mb-2">Transform YouTube into Your Learning Platform</h1>
              <p className="text-foreground/80">
                Import any YouTube playlist and turn it into an interactive course with progress tracking and
                AI-generated assignments
              </p>
            </div>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="playlist-url" className="text-sm text-foreground font-medium">
                    Enter YouTube Playlist URL
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1 ">
                      <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                      <Input
                        id="playlist-url"
                        placeholder="https://www.youtube.com/playlist?list=..."
                        value={playlistUrl}
                        onChange={(e) => setPlaylistUrl(e.target.value)}
                        className="bg-input text-foreground border border-border pl-10"
                      />
                    </div>
                    <Button type="submit" className="text-xl font-bold tracking-tight" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Transform"
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 bg-purple-500/50 rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                      <BookOpen className="h-8 w-8 text-blue-800" />
                    </div>
                    <h3 className="font-medium mb-1">AI-Generated Assignments</h3>
                    <p className="text-sm text-muted-foreground">Practice with custom assignments for each video</p>
                  </div>

                  <div className="p-4 bg-purple-500/50 rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                      <RefreshCw className="h-6 w-6 text-green-800" />
                    </div>
                    <h3 className="font-medium mb-1">Progress Tracking</h3>
                    <p className="text-sm text-muted-foreground">Track your progress through any YouTube playlist</p>
                  </div>

                  <div className="p-4 bg-purple-500/50 rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                      <Share2 className="h-6 w-6 text-purple-800" />
                    </div>
                    <h3 className="font-medium mb-1">Share Your Progress</h3>
                    <p className="text-sm text-muted-foreground">Share your learning journey with others</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      <span>982 active users</span>
                    </Badge>
                  </div>
                
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <div className=" flex flex-col md:flex-row md:items-center justify-between gap-4 ">
            <div className="flex items-center gap-4 ">
              {currentPlaylist.thumbnailUrl && (
                <Image
                  src={currentPlaylist.thumbnailUrl || "/placeholder.svg"}
                  alt={currentPlaylist.title}
                  width={80}
                  height={45}
                  className="rounded-md object-cover hidden md:block"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold">{currentPlaylist.title}</h1>
                <p className="text-sm text-muted-foreground">
                  By {currentPlaylist.channelTitle} • {currentPlaylist.totalVideos} • {currentPlaylist.totalDuration}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1" onClick={handleShareProgress}>
                <Share2 className="h-4 w-4" />
                <span>Share Your Progress</span>
              </Button>
              
              <Button variant="destructive" size="sm" className="gap-1" onClick={handleReset}>
                <Trash2 className="h-4 w-4" />
                <span className="hidden md:inline">Remove</span>
              </Button>
            </div>
          </div>
          
          {isAchievementOpen && (
            <Modal onClose={() => setIsAchievementOpen(false)}>
              <AchievementCard
                userData={{
                 
                  email:user?.primaryEmailAddress?.emailAddress??"",
                  completedVideos,

                  playlistName: currentPlaylist.title,
                  playlistUrl: playlistUrl,
                  avatarUrl: "/profile.webp",
                  thumbnailUrl:currentPlaylist.thumbnailUrl
                }}
              />
            </Modal>
          )}

          <Tabs defaultValue="videos" className="w-full">
              
            {isModalOpen && currentVideoUrl && (
                <VideoModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  youtubeUrl={currentVideoUrl}
                  onVideoComplete={() => {
                    if (currentPlaylist) {
                      const updatedVideos = currentPlaylist.videos.map((v) =>
                        v.id === currentVideoId ? { ...v, completed: true } : v
                      );
                      setCurrentPlaylist({ ...currentPlaylist, videos: updatedVideos });
              
                      // optional: update the counter
                      setCompletedVideos((prev) => prev + 1);
                    }
                  }}
                  
                />
              )}  
            
            <TabsList className="mb-4">
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="notes">My Notes</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>
            <TabsContent value="videos">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <VideoList playlist={currentPlaylist} onProgressUpdate={handleProgressUpdate} onOpenModal={openModal} />
                </div>
                <div className="space-y-6">
                  <PlaylistStats
                    playlist={{
                      ...currentPlaylist,
                      completedVideos,
                    }}
                  />

                  <Card className="bg-card border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Community Stats</h3>
                        <Badge variant="outline">Live</Badge>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Active Learners</span>
                          <span className="font-medium">243</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Completion Rate</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Avg. Completion Time</span>
                          <span className="font-medium">14 days</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notes">
              <div className="bg-accent border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">My Course Notes</h2>
                <p className="text-muted-foreground mb-6">
                  Take notes as you progress through the course to help reinforce your learning.
                </p>

                <div className="min-h-[300px] bg-background rounded-lg p-4 border border-border">
                  <p className="text-muted-foreground text-center py-10">
                    Your notes will appear here as you add them to videos.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="assignments">
              <div className="bg-accent border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">My Assignments</h2>
                <p className="text-muted-foreground mb-6">Track your progress on assignments for each video in the course.</p>

                <div className="min-h-[300px] bg-background rounded-lg p-4 border border-border">
                  <p className="text-muted-foreground text-center py-10">
                    Complete assignments from the video list to see them here.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
