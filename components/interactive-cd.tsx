"use client"

import { useEffect, useRef, useState } from "react"

type Track = {
  id: string
  title: string
  artist: string
  duration: string
  albumArt: string
  audioFile: string
  src: string // for music-player.tsx
}

interface InteractiveCDProps {
  tracks: Track[]
  currentTrack?: number
  onTrackChange?: (trackIndex: number) => void
}

export default function InteractiveCD({ tracks, currentTrack = 0, onTrackChange }: InteractiveCDProps) {
  const circleRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const spinTimelineRef = useRef<any>(null)
  const draggableRef = useRef<any>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window === "undefined") return

      // Load GSAP and Draggable
      if (!window.gsap) {
        const gsapScript = document.createElement("script")
        gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        document.head.appendChild(gsapScript)

        await new Promise((resolve) => {
          gsapScript.onload = resolve
        })
      }

      if (!window.Draggable) {
        const draggableScript = document.createElement("script")
        draggableScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Draggable.min.js"
        document.head.appendChild(draggableScript)

        await new Promise((resolve) => {
          draggableScript.onload = resolve
        })
      }

      initCD()
    }

    const initCD = () => {
      if (!circleRef.current || !window.gsap || !window.Draggable) return

      const circle = circleRef.current
      const images = placeAlbumArts()

      // Create spinning animation
      spinTimelineRef.current = window.gsap
        .timeline({ repeat: -1, defaults: { duration: 20, ease: "none" } })
        .to(circle, { rotation: 360 })
        .to(images, { rotation: -360 }, 0)

      // Initially pause the animation
      spinTimelineRef.current.pause()

      // Create draggable
      draggableRef.current = window.Draggable.create(circle, {
        type: "rotation",
        inertia: true,
        onPressInit: () => {
          setIsDragging(true)
          if (spinTimelineRef.current) {
            spinTimelineRef.current.pause()
          }
        },
        onDrag: function () {
          const angle = (this.rotation + 360 * 100000) % 360
          if (spinTimelineRef.current) {
            spinTimelineRef.current.progress(angle / 360)
          }
          // Simulate playing while dragging
          setIsPlaying(true)
        },
        onThrowUpdate: function () {
          const angle = (this.rotation + 360 * 100000) % 360
          if (spinTimelineRef.current) {
            spinTimelineRef.current.progress(angle / 360)
          }
        },
        onThrowComplete: () => {
          setIsDragging(false)
          if (spinTimelineRef.current && isPlaying) {
            spinTimelineRef.current.resume()
            window.gsap.fromTo(
              spinTimelineRef.current,
              { timeScale: 0 },
              { duration: 1, timeScale: 1, ease: "power1.in" },
            )
          } else {
            setIsPlaying(false)
          }
        },
      })[0]
    }

    const placeAlbumArts = () => {
      if (!circleRef.current) return []

      const circle = circleRef.current
      const angleIncrement = (Math.PI * 2) / tracks.length
      const radius = circle.offsetWidth / 2
      const images: HTMLElement[] = []

      // Clear existing images
      const existingImages = circle.querySelectorAll(".album-art")
      existingImages.forEach((img) => img.remove())

      tracks.forEach((track, i) => {
        const imageContainer = document.createElement("div")
        imageContainer.className = "album-art absolute"
        imageContainer.innerHTML = `
          <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
            <img src="${track.albumArt}" alt="${track.title}" class="w-full h-full object-cover" />
          </div>
        `

        images.push(imageContainer)
        circle.appendChild(imageContainer)

        const angle = angleIncrement * i
        window.gsap.set(imageContainer, {
          position: "absolute",
          top: 0,
          left: 0,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "50% 50%",
          x: radius + Math.cos(angle) * (radius - 40),
          y: radius + Math.sin(angle) * (radius - 40),
        })
      })

      return images
    }

    loadGSAP()

    return () => {
      if (draggableRef.current) {
        draggableRef.current.kill()
      }
      if (spinTimelineRef.current) {
        spinTimelineRef.current.kill()
      }
    }
  }, [tracks, isPlaying])

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentTrack])

  const togglePlay = () => {
    if (!spinTimelineRef.current) return

    if (isPlaying) {
      spinTimelineRef.current.pause()
      setIsPlaying(false)
    } else {
      spinTimelineRef.current.resume()
      setIsPlaying(true)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* CD Player */}
      <div className="relative">
        <div
          ref={circleRef}
          className="main-circle relative w-64 h-64 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-full shadow-2xl cursor-grab active:cursor-grabbing"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
              radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.3) 21%, rgba(0,0,0,0.3) 80%, transparent 81%),
              conic-gradient(from 0deg, #1e40af, #16a34a, #1e40af)
            `,
          }}
        >
          {/* Center hole */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full shadow-inner">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full"></div>
          </div>

          {/* Reflection effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors z-10"
        >
          {isPlaying ? (
            <div className="flex space-x-1">
              <div className="w-2 h-6 bg-white rounded"></div>
              <div className="w-2 h-6 bg-white rounded"></div>
            </div>
          ) : (
            <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
          )}
        </button>
      </div>

      {/* Track Info */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-1">{tracks[currentTrack]?.title}</h3>
        <p className="text-gray-400">{tracks[currentTrack]?.artist}</p>
        <p className="text-sm text-gray-500 mt-2">
          {isDragging ? "🎵 Scrubbing..." : isPlaying ? "🎵 Now Playing" : "⏸️ Paused"}
        </p>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-400 max-w-md">
        <p>🎛️ Drag the CD to scrub through the track</p>
        <p>▶️ Click the center button to play/pause</p>
      </div>

      {/* Audio Element */}
      {tracks[currentTrack]?.audioFile && (
        <audio ref={audioRef} src={tracks[currentTrack].audioFile} controls className="hidden" />
      )}
    </div>
  )
}
