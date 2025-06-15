import { createClient } from "contentful";

const hasContentfulCredentials = () => {
  return !!(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN);
};

const createContentfulClient = () => {
  if (!hasContentfulCredentials()) {
    console.warn("Contentful credentials not found, using mock data");
    return null;
  }

  try {
    return createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
  } catch (error) {
    console.error("Failed to create Contentful client:", error);
    return null;
  }
};

const client = createContentfulClient();
export default client;

export interface BlogPost {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
  fields: {
    title: string
    slug: string
    excerpt: string
    content: any
    featuredImage: {
      fields: {
        file: {
          url: string
        }
        title: string
      }
    }
    author: string
    publishDate: string
    tags: string[]
    readTime: number
  }
}

export interface MusicRelease {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
  fields: {
    title: string
    artist: string
    releaseType: "Album" | "EP" | "Single"
    releaseDate: string
    trackCount: number
    description: string
    coverArt: {
      fields: {
        file: {
          url: string
        }
        title: string
      }
    }
    streamingLinks: {
      spotify?: string
      appleMusic?: string
      youtube?: string
      soundcloud?: string
    }
    featured: boolean
  }
}

export interface TourDate {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
  fields: {
    venue: string
    city: string
    country: string
    date: string
    time: string
    ticketStatus: "available" | "limited" | "sold-out"
    ticketLink?: string
    description?: string
    featured: boolean
  }
}

// Mock data for fallback
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
]

// Blog Posts
export async function getBlogPosts(limit = 10): Promise<BlogPost[]> {
  if (!client) {
    console.log("Using mock blog posts data")
    return mockBlogPosts.slice(0, limit)
  }

  try {
    const entries = await client.getEntries({
      content_type: "blogPost",
      limit,
      order: "-fields.publishDate",
    })
    return entries.items as BlogPost[]
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return mockBlogPosts.slice(0, limit)
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!client) {
    console.log("Using mock blog post data")
    return mockBlogPosts.find((post) => post.fields.slug === slug) || null
  }

  try {
    const entries = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    })
    if (entries.items.length > 0) {
      return entries.items[0] as BlogPost
    }
    return null
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return mockBlogPosts.find((post) => post.fields.slug === slug) || null
  }
}

// Music Releases
export async function getMusicReleases(limit = 10): Promise<MusicRelease[]> {
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
  ]

  if (!client) {
    console.log("Using mock music releases data")
    return mockReleases.slice(0, limit)
  }

  try {
    const entries = await client.getEntries({
      content_type: "musicRelease",
      limit,
      order: "-fields.releaseDate",
    })
    return entries.items as MusicRelease[]
  } catch (error) {
    console.error("Error fetching music releases:", error)
    return mockReleases.slice(0, limit)
  }
}

export async function getFeaturedReleases(limit = 4): Promise<MusicRelease[]> {
  if (!client) {
    const mockReleases = await getMusicReleases()
    return mockReleases.filter((release) => release.fields.featured).slice(0, limit)
  }

  try {
    const entries = await client.getEntries({
      content_type: "musicRelease",
      "fields.featured": true,
      limit,
      order: "-fields.releaseDate",
    })
    return entries.items as MusicRelease[]
  } catch (error) {
    console.error("Error fetching featured releases:", error)
    const mockReleases = await getMusicReleases()
    return mockReleases.filter((release) => release.fields.featured).slice(0, limit)
  }
}

// Tour Dates
export async function getTourDates(limit = 20): Promise<TourDate[]> {
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
  ]

  if (!client) {
    console.log("Using mock tour dates data")
    return mockTourDates.slice(0, limit)
  }

  try {
    const entries = await client.getEntries({
      content_type: "tourDate",
      limit,
      order: "fields.date",
    })
    return entries.items as TourDate[]
  } catch (error) {
    console.error("Error fetching tour dates:", error)
    return mockTourDates.slice(0, limit)
  }
}

export async function getUpcomingTourDates(limit = 10): Promise<TourDate[]> {
  if (!client) {
    const allTourDates = await getTourDates()
    const today = new Date().toISOString().split("T")[0]
    return allTourDates.filter((tour) => tour.fields.date >= today).slice(0, limit)
  }

  try {
    const today = new Date().toISOString().split("T")[0]
    const entries = await client.getEntries({
      content_type: "tourDate",
      "fields.date[gte]": today,
      limit,
      order: "fields.date",
    })
    return entries.items as TourDate[]
  } catch (error) {
    console.error("Error fetching upcoming tour dates:", error)
    const allTourDates = await getTourDates()
    const today = new Date().toISOString().split("T")[0]
    return allTourDates.filter((tour) => tour.fields.date >= today).slice(0, limit)
  }
}
