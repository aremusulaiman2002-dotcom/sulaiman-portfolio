export interface SanityPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  content: any[] // PortableText blocks
  coverImage?: {
    asset: {
      url: string
    }
  }
  date: string
  tags?: string[]
}