"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import type { BlogPost } from "@/lib/contentful"

// Mock data for demonstration - replace with actual Contentful data
const mockBlogPosts: BlogPost[] = [
  {
    sys: {
      id: "1",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    fields: {
      title: "The Evolution of Electronic Music: From Analog to Digital",
      slug: "evolution-electronic-music-analog-digital",
      excerpt:
        "Exploring how electronic music has transformed over the decades, from the early analog synthesizers to today's digital production techniques.",
      content: {},
      featuredImage: {
        fields: {
          file: {
            url: "/images/profile.jpg",
          },
          title: "Electronic Music Evolution",
        },
      },
      author: "Rodriw Castel",
      publishDate: "2024-01-15",
      tags: ["Electronic Music", "Production", "Technology"],
      readTime: 8,
    },
  },
  {
    sys: {
      id: "2",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
    fields: {
      title: "Behind the Scenes: Creating 'Digital Dreams'",
      slug: "behind-scenes-creating-digital-dreams",
      excerpt:
        "A deep dive into the creative process behind my latest album, including the inspiration, challenges, and breakthrough moments.",
      content: {},
      featuredImage: {
        fields: {
          file: {
            url: "/placeholder.svg?height=400&width=600",
          },
          title: "Digital Dreams Album",
        },
      },
      author: "Rodriw Castel",
      publishDate: "2024-01-10",
      tags: ["Album", "Creative Process", "Studio"],
      readTime: 12,
    },
  },
  {
    sys: {
      id: "3",
      createdAt: "2024-01-05T10:00:00Z",
      updatedAt: "2024-01-05T10:00:00Z",
    },
    fields: {
      title: "The Art of Live Electronic Performance",
      slug: "art-live-electronic-performance",
      excerpt:
        "How to bring electronic music to life on stage, creating an immersive experience that connects with the audience.",
      content: {},
      featuredImage: {
        fields: {
          file: {
            url: "/placeholder.svg?height=400&width=600",
          },
          title: "Live Performance",
        },
      },
      author: "Rodriw Castel",
      publishDate: "2024-01-05",
      tags: ["Live Performance", "Stage Design", "Audience"],
      readTime: 6,
    },
  },
]

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, you would fetch from Contentful here
    // For now, we'll use mock data
    const fetchBlogPosts = async () => {
      try {
        // const posts = await getBlogPosts(6)
        setBlogPosts(mockBlogPosts)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setBlogPosts(mockBlogPosts) // Fallback to mock data
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-white text-xl">Loading blog posts...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-gray-900 to-black">
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
            Latest from the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-musgo-green">Blog</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Insights into my creative process, industry thoughts, and behind-the-scenes stories from the studio and
            stage.
          </motion.p>
        </motion.div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-royal-blue/50 transition-all duration-300 group">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={blogPosts[0].fields.featuredImage?.fields.file.url || "/placeholder.svg"}
                    alt={blogPosts[0].fields.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/60"></div>
                </div>

                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {formatDate(blogPosts[0].fields.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {blogPosts[0].fields.readTime} min read
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-royal-blue transition-colors">
                    {blogPosts[0].fields.title}
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed">{blogPosts[0].fields.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {blogPosts[0].fields.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-royal-blue/20 text-royal-blue text-xs rounded-full border border-royal-blue/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${blogPosts[0].fields.slug}`}
                      className="flex items-center gap-2 text-royal-blue hover:text-blue-400 transition-colors font-medium"
                    >
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.sys.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-royal-blue/50 transition-all duration-300 hover:shadow-2xl hover:shadow-royal-blue/10">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.fields.featuredImage?.fields.file.url || "/placeholder.svg"}
                    alt={post.fields.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(post.fields.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.fields.readTime} min
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-royal-blue transition-colors line-clamp-2">
                    {post.fields.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.fields.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.fields.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-musgo-green/20 text-musgo-green text-xs rounded-full border border-musgo-green/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.fields.slug}`}
                      className="text-royal-blue hover:text-blue-400 transition-colors text-sm font-medium"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-royal-blue to-musgo-green text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 font-medium"
          >
            View All Posts <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
