"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import client from "../contentful"; // Adjust path as needed

type Track = {
  id: string
  title: string
  artist: string
  duration: string
  albumArt: string
  audioFile: string
  src: string
}

async function fetchTracks(): Promise<Track[]> {
  const entries = await client.getEntries({ content_type: "track", order: "fields.title" });
  return entries.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    artist: item.fields.artist,
    duration: item.fields.duration,
    albumArt: item.fields.albumArt?.fields?.file?.url
      ? "https:" + item.fields.albumArt.fields.file.url
      : "/placeholder.svg?height=300&width=300",
    audioFile: item.fields.audioFile?.fields?.file?.url
      ? "https:" + item.fields.audioFile.fields.file.url
      : "",
    src: item.fields.audioFile?.fields?.file?.url
      ? "https:" + item.fields.audioFile.fields.file.url
      : "",
  }));
}

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    fetchTracks().then(setTracks);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [currentTrack])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (tracks.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6 rounded-2xl shadow-2xl">
      <audio ref={audioRef} src={tracks[currentTrack]?.src} />

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{tracks[currentTrack]?.title}</h3>
        <p className="text-gray-400">{tracks[currentTrack]?.artist}</p>
      </div>

      <div className="flex items-center justify-center space-x-6 mb-6">
        <button onClick={prevTrack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <SkipBack size={24} />
        </button>

        <button onClick={togglePlay} className="bg-royal-blue hover:bg-blue-700 p-4 rounded-full transition-colors">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button onClick={nextTrack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <SkipForward size={24} />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-royal-blue to-musgo-green h-2 rounded-full transition-all"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {tracks.map((track, index) => (
          <button
            key={track.id}
            onClick={() => setCurrentTrack(index)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              index === currentTrack ? "bg-royal-blue/20 text-white" : "hover:bg-white/5 text-gray-300"
            }`}
          >
            <div className="flex justify-between">
              <span>{track.title}</span>
              <span className="text-gray-400">{track.duration}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
