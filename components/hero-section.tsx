"use client"

import { motion } from "framer-motion"
import EnhancedCD from "./enhanced-cd"
import client from '../contentful'; // Adjust path as needed
import React, { useEffect, useState } from "react";
import InteractiveCD from "./interactive-cd";
import { ExternalLink } from 'lucide-react';

export type Track = {
  id: string
  title: string
  artist: string
  duration: string
  albumArt: string
  audioFile: string
  src: string // for music-player.tsx
}

const sampleTracks: Track[] = [
  {
    id: "1",
    title: "Digital Dreams",
    artist: "Rodriw Castel",
    duration: "3:45",
    albumArt: "/images/profile.jpg",
  },
  {
    id: "2",
    title: "Neon Nights",
    artist: "Rodriw Castel",
    duration: "4:12",
    albumArt: "/images/cover.jpg",
  },
  {
    id: "3",
    title: "Electric Soul",
    artist: "Rodriw Castel",
    duration: "3:28",
    albumArt: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    title: "Cosmic Waves",
    artist: "Rodriw Castel",
    duration: "5:03",
    albumArt: "/placeholder.svg?height=300&width=300",
  },
]

export async function fetchTracks(): Promise<Track[]> {
  const entries = await client.getEntries({ content_type: "track", order: "fields.title" });
  return entries.items.map((item: any) => {
    const albumArtUrl =
      item.fields.albumArt?.fields?.file?.url
        ? "https:" + item.fields.albumArt.fields.file.url
        : "/placeholder.svg?height=300&width=300";
    const audioFileUrl =
      item.fields.audioFile?.fields?.file?.url
        ? "https:" + item.fields.audioFile.fields.file.url
        : undefined;
    return {
      id: item.sys.id,
      title: item.fields.title,
      artist: item.fields.artist,
      duration: item.fields.duration,
      albumArt: albumArtUrl,
      audioFile: audioFileUrl,
    };
  });
}

export default function HeroSection() {
  const [tracks, setTracks] = useState<Track[]>(sampleTracks);

  useEffect(() => {
    fetchTracks().then(fetchedTracks => {
      if (fetchedTracks && fetchedTracks.length > 0) {
        setTracks(fetchedTracks);
      }
      // If fetch fails or returns empty, sampleTracks remain
    });
  }, []);

  return (
    <>
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-royal-blue/20 overflow-hidden font-poppins"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-royal-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-musgo-green/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-artist-purple/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-royal-blue to-musgo-green text-white text-sm font-medium rounded-full">
                🎵 Music Artist
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Welcome to Rodriw Castel's World
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-musgo-green">
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
               Castel embarks on the boat, making a bright arrival through the vibrant ecosystem of Alternative Pop.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-royal-blue to-musgo-green text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => window.open("https://open.spotify.com/intl-pt/artist/0B3ULU9OFFOT4oQgVokrbS?si=na4-aLERQJWFTDmOjbaQZA", "_blank")}
              >
                Listen
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold"
              >
                Live
              </motion.button>
              <a
                href="#tour"
                className="bg-royal-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 group-hover:scale-105 transform duration-200"
              >
                <ExternalLink size={16} />
                Now Tickets
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <EnhancedCD tracks={tracks} currentTrack={0} />
              <InteractiveCD tracks={tracks} currentTrack={0} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating music notes animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10 text-4xl"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: (typeof window !== "undefined" ? window.innerHeight : 800) + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            ♪
          </motion.div>
        ))}
      </div>
    </section>

    <section id="tour">
      {/* Tour Dates content */}
    </section>
    </>
  )
}
