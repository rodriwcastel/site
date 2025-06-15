"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function GallerySection() {
  // Placeholder artwork data - in a real app, this would come from a CMS or API
  const artworks = [
    {
      id: 1,
      title: "Digital Dreams",
      medium: "Digital Art",
      year: "2024",
      image: "/images/profile.jpg",
    },
    {
      id: 2,
      title: "Abstract Emotions",
      medium: "Mixed Media",
      year: "2023",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      title: "Color Symphony",
      medium: "Acrylic on Canvas",
      year: "2023",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 4,
      title: "Modern Perspectives",
      medium: "Digital Collage",
      year: "2024",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 5,
      title: "Geometric Harmony",
      medium: "Vector Art",
      year: "2024",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 6,
      title: "Ethereal Landscapes",
      medium: "Oil on Canvas",
      year: "2023",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-royal-blue">Artworks</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover a curated selection of my latest works, showcasing diverse techniques and artistic explorations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{artwork.title}</h3>
                    <p className="text-sm opacity-90">
                      {artwork.medium} • {artwork.year}
                    </p>
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
          <button className="bg-musgo-green text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
            View Complete Portfolio
          </button>
        </motion.div>
      </div>
    </section>
  )
}
