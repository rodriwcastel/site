"use client"

import { useEffect, useRef, useState } from "react"

interface Track {
  id: number
  title: string
  artist: string
  duration: string
  albumArt: string
}

interface EnhancedCDProps {
  tracks: Track[]
  currentTrack?: number
  onTrackChange?: (trackIndex: number) => void
}

export default function EnhancedCD({ tracks, currentTrack = 0, onTrackChange }: EnhancedCDProps) {
  const circleRef = useRef<HTMLDivElement>(null)
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

      // Create spinning animation
      spinTimelineRef.current = window.gsap
        .timeline({ repeat: -1, defaults: { duration: 15, ease: "none" } })
        .to(circle, { rotation: 360 })

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
    <div className="flex flex-col items-center space-y-6 font-poppins">
      {/* Enhanced CD Player */}
      <div className="relative">
        <div
          ref={circleRef}
          className="main-circle relative w-80 h-80 rounded-full shadow-2xl cursor-grab active:cursor-grabbing overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, transparent 15%, rgba(255,255,255,0.1) 16%, rgba(255,255,255,0.1) 17%, transparent 18%),
              radial-gradient(circle at 50% 50%, transparent 25%, rgba(255,255,255,0.05) 26%, rgba(255,255,255,0.05) 27%, transparent 28%),
              radial-gradient(circle at 50% 50%, transparent 35%, rgba(255,255,255,0.03) 36%, rgba(255,255,255,0.03) 37%, transparent 38%),
              radial-gradient(circle at 50% 50%, transparent 45%, rgba(255,255,255,0.02) 46%, rgba(255,255,255,0.02) 47%, transparent 48%),
              radial-gradient(circle at 50% 50%, transparent 55%, rgba(255,255,255,0.01) 56%, rgba(255,255,255,0.01) 57%, transparent 58%),
              conic-gradient(from 0deg, 
          rgba(30, 64, 175, 0.8), 
          rgba(22, 163, 74, 0.8), 
          rgba(30, 64, 175, 0.8)
              ),
              linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)
            `,
          }}
        >
          {/* Data tracks (concentric circles) */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-white/5"
              style={{
          margin: `${20 + i * 15}px`,
              }}
            />
          ))}

          {/* Album artwork in center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
            <img
              src={tracks[currentTrack]?.albumArt || "/placeholder.svg"}
              alt={tracks[currentTrack]?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center hole */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full shadow-inner border border-gray-600">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>

          {/* Holographic reflection effect */}
          <div
            className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
            style={{
              background: `
          radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
          linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
              `,
            }}
          />

          {/* Track markers */}
          {tracks.map((_, index) => {
            const angle = (360 / tracks.length) * index
            return (
              <div
          key={index}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-120px)`,
          }}
              />
            )
          })}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-200 z-10 border border-white/20 shadow-lg hover:scale-105"
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
        <h3 className="text-xl font-semibold text-white mb-1">{tracks[currentTrack]?.title}</h3>
        <p className="text-gray-400 font-medium">{tracks[currentTrack]?.artist}</p>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          {isDragging ? "🎵 Scrubbing..." : isPlaying ? "🎵 Now Playing" : "⏸️ Paused"}
        </p>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-400 max-w-md font-medium">
        <p>🎛️ Drag the CD to scrub through the track</p>
        <p>▶️ Click the center button to play/pause</p>
      </div>
    </div>
  )
}
