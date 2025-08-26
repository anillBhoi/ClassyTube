"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { PlaylistDashboard } from "@/components/playlist-dashboard"
import { VideoList } from "@/components/video-list"

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const playlistId = params?.id
  const [playlist, setPlaylist] = useState<any | null>(null)

  useEffect(() => {
    if (!playlistId) return
    try {
      const stored = localStorage.getItem("userPlaylists")
      if (stored) {
        const list = JSON.parse(stored)
        const found = Array.isArray(list) ? list.find((p: any) => String(p.id) === String(playlistId)) : null
        setPlaylist(found || null)
      }
    } catch (_) {
      setPlaylist(null)
    }
  }, [playlistId])

  function handleProgressUpdate() {}
  function handleOpenModal() {}

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto p-4">
        {!playlist ? (
          <div className="text-center text-gray-400 py-16">
            Course not found. Go back to the courses page.
          </div>
        ) : (
          <VideoList playlist={playlist} onProgressUpdate={handleProgressUpdate} onOpenModal={handleOpenModal} />
        )}
      </div>
    </div>
  )
}


