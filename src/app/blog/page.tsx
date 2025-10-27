import { client } from '../../lib/sanity'
import { AnimatedBlogCard } from '../../components/AnimatedBlogCard'

interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  date: string
  coverImage?: string
}

async function getPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(date desc) {
    _id,
    title,
    slug,
    excerpt,
    date,
    "coverImage": coverImage.asset->url
  }`
  
  return await client.fetch(query)
}

export default async function Blog() {
  const posts = await getPosts()
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center z-10 max-w-4xl mx-auto pt-20">
          {/* Main title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Blog
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Exploring <span className="text-cyan-400 font-semibold">web development</span>, 
            <span className="text-purple-400 font-semibold"> design insights</span>, and 
            <span className="text-blue-400 font-semibold"> tech innovations</span>
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{posts.length}+</div>
              <div className="text-gray-400 text-sm">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">100%</div>
              <div className="text-gray-400 text-sm">Original Content</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">Always</div>
              <div className="text-gray-400 text-sm">Learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="relative z-10 px-4 max-w-6xl mx-auto -mt-20">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post) => (
            <AnimatedBlogCard key={post._id} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16 card-glass max-w-2xl mx-auto">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No posts yet</h3>
            <p className="text-gray-400 mb-6">I'm working on some amazing content. Check back soon!</p>
            <div className="animate-pulse text-cyan-400">
              Coming soon...
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="card-glass p-8 text-center max-w-2xl mx-auto mb-16 gradient-border">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6">
            Get notified when I publish new articles about web development and design.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn-primary">
              Subscribe to Newsletter
            </button>
            <button className="btn-secondary">
              Follow on Twitter
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}