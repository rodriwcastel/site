import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react"
import { getBlogPost } from "@/lib/contentful"
import ContentfulRichText from "@/components/contentful-rich-text"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-royal-blue transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image */}
        {post.fields.featuredImage && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.fields.featuredImage.fields.file.url || "/placeholder.svg?height=400&width=800"}
              alt={post.fields.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {formatDate(post.fields.publishDate)}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              {post.fields.readTime} min read
            </div>
            <div className="text-gray-500">•</div>
            <div>By {post.fields.author}</div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.fields.title}</h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-6 font-medium">{post.fields.excerpt}</p>

          {/* Tags */}
          {post.fields.tags && post.fields.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.fields.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-royal-blue/20 text-royal-blue text-sm rounded-full border border-royal-blue/30"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {post.fields.content ? (
            <ContentfulRichText content={post.fields.content} />
          ) : (
            <div className="text-gray-300 leading-relaxed">
              <p className="mb-6">
                This is a sample blog post content. When you connect to Contentful and add rich text content, it will
                appear here with proper formatting.
              </p>
              <p className="mb-6">
                The content management system allows you to create rich, formatted content with images, links, and
                various text styles.
              </p>
            </div>
          )}
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">About the Author</h3>
            <p className="text-gray-300 font-medium">
              {post.fields.author} is an electronic music producer and artist, crafting sonic landscapes that transcend
              boundaries and connect souls through sound.
            </p>
          </div>
        </footer>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  // Return empty array for now - will be populated when Contentful is connected
  return []
}
