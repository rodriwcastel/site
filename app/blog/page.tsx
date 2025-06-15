import { getBlogPosts } from "@/lib/contentful"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"

export default async function BlogPage() {
  // This will use mock data if Contentful isn't configured
  const posts = await getBlogPosts(20)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-black font-poppins">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-royal-blue transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            All{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-musgo-green">
              Blog Posts
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
            Insights into my creative process, industry thoughts, and behind-the-scenes stories from the studio and
            stage.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg font-medium">No blog posts available at the moment.</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.sys.id} className="group">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-royal-blue/50 transition-all duration-300 hover:shadow-2xl hover:shadow-royal-blue/10">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.fields.featuredImage?.fields.file.url || "/placeholder.svg?height=300&width=400"}
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

                    <h2 className="text-lg font-bold text-white mb-3 group-hover:text-royal-blue transition-colors line-clamp-2">
                      {post.fields.title}
                    </h2>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 font-medium">{post.fields.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.fields.tags?.slice(0, 2).map((tag) => (
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
                        className="text-royal-blue hover:text-blue-400 transition-colors text-sm font-semibold"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
