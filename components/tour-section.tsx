"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"
import type { TourDate } from "@/lib/contentful"

// Mock data for demonstration - replace with actual Contentful data
const mockTourDates: TourDate[] = [
  {
    sys: {
      id: "1",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    fields: {
      venue: "Electric Dreams Festival",
      city: "Los Angeles",
      country: "CA",
      date: "2024-07-15",
      time: "9:00 PM",
      ticketStatus: "available",
      ticketLink: "#",
      featured: true,
    },
  },
  {
    sys: {
      id: "2",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
    fields: {
      venue: "Neon Nights Club",
      city: "New York",
      country: "NY",
      date: "2024-07-22",
      time: "10:30 PM",
      ticketStatus: "sold-out",
      ticketLink: "#",
      featured: false,
    },
  },
]

export default function TourSection() {
  const [tourDates, setTourDates] = useState<TourDate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTourDates = async () => {
      try {
        // const upcomingTours = await getUpcomingTourDates(10)
        setTourDates(mockTourDates)
      } catch (error) {
        console.error("Error fetching tour dates:", error)
        setTourDates(mockTourDates)
      } finally {
        setLoading(false)
      }
    }

    fetchTourDates()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: date.getDate(),
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-musgo-green border-musgo-green"
      case "limited":
        return "text-yellow-400 border-yellow-400"
      case "sold-out":
        return "text-red-400 border-red-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  if (loading) {
    return (
      <section id="tour" className="py-20 bg-gradient-to-b from-gray-900 to-black font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-white text-xl font-medium">Loading tour dates...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="tour" className="py-20 bg-gradient-to-b from-gray-900 to-black font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            Upcoming{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-musgo-green">
              Lives
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the music live. Let's meet at the next show! 
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {tourDates.map((show, index) => {
            const { month, day } = formatDate(show.fields.date)
            return (
              <motion.div
                key={show.sys.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-royal-blue/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-center min-w-[80px]">
                      <div className="text-royal-blue text-sm font-semibold">{month}</div>
                      <div className="text-white text-3xl font-bold">{day}</div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{show.fields.venue}</h3>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span className="font-medium">
                            {show.fields.city}, {show.fields.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span className="font-medium">{show.fields.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        show.fields.ticketStatus,
                      )}`}
                    >
                      {show.fields.ticketStatus.replace("-", " ").toUpperCase()}
                    </span>

                    {show.fields.ticketStatus !== "sold-out" && (
                      <button className="bg-royal-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 group-hover:scale-105 transform duration-200">
                        <ExternalLink size={16} />
                        Tickets
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-musgo-green to-royal-blue text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-semibold">
            View All Live Dates
          </button>
        </motion.div>
      </div>
    </section>
  )
}
