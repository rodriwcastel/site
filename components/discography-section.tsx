"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Play, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"
import type { MusicRelease } from "@/lib/contentful"

// Mock data for demonstration - replace with actual Contentful data
const mockReleases: MusicRelease[] = [
  {
    sys: {
      id: "1",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    fields: {
      title: "Digital Dreams",
      artist: "Rodriw Castel",
      releaseType: "Album",
      releaseDate: "2024-01-15",
      trackCount: 12,
      description: "A journey through electronic soundscapes and emotional depths.",
      coverArt: {
        fields: {
          file: {
            url: "/images/profile.jpg",
          },
          title: "Digital Dreams Cover",
        },
      },
      streamingLinks: {
        spotify: "#",
        appleMusic: "#",
        youtube: "#",
        soundcloud: "#",
      },
      featured: true,
    },
  },
  {
    sys: {
      id: "2",
      createdAt: "2023-12-10T10:00:00Z",
      updatedAt: "2023-12-10T10:00:00Z",
    },
    fields: {
      title: "Neon Nights EP",
      artist: "Rodriw Castel",
      releaseType: "EP",
      releaseDate: "2023-12-10",
      trackCount: 6,
      description: "Late-night vibes with synthesized melodies and urban beats.",
      coverArt: {
        fields: {
          file: {
            url: "/placeholder.svg?height=300&width=300",
          },
          title: "Neon Nights Cover",
        },
      },
      streamingLinks: {
        spotify: "#",
        appleMusic: "#",
        youtube: "#",
      },
      featured: false,
    },
  },
]

export default function DiscographySection() {
  const [releases, setReleases] = useState<MusicRelease[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        // const musicReleases = await getMusicReleases(6)
        setReleases(mockReleases)
      } catch (error) {
        console.error("Error fetching music releases:", error)
        setReleases(mockReleases)
      } finally {
        setLoading(false)
      }
    }

    fetchReleases()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear()
  }

  if (loading) {
    return (
      <section id="music" className="py-20 bg-gradient-to-b from-black to-gray-900 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-white text-xl font-medium">Loading music releases...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="music" className="py-20 bg-gradient-to-b from-black to-gray-900 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-musgo-green">
              Releases
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore my musical journey through albums, EPs, and singles that define my artistic evolution.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {releases.map((release, index) => (
            <motion.div
              key={release.sys.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-royal-blue/50 transition-all duration-300 hover:shadow-2xl hover:shadow-royal-blue/10">
                <div className="flex gap-6">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={release.fields.coverArt?.fields.file.url || "/placeholder.svg"}
                      alt={release.fields.title}
                      width={120}
                      height={120}
                      className="rounded-xl object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <Play className="text-white w-8 h-8" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{release.fields.title}</h3>
                        <p className="text-gray-400 text-sm font-medium">
                          {release.fields.releaseType} • {formatDate(release.fields.releaseDate)} •{" "}
                          {release.fields.trackCount} track{release.fields.trackCount > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 font-medium">{release.fields.description}</p>

                    <div className="flex items-center gap-3">
                      <button className="bg-royal-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                        <Play size={16} />
                        Play
                      </button>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                        <ExternalLink size={16} />
                        Stream
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-musgo-green to-royal-blue text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-semibold">
            View Complete Discography
          </button>
        </motion.div>
      </div>
    </section>
  )
}
