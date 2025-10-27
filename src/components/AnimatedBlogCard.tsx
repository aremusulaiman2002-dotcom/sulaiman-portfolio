'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

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

interface AnimatedBlogCardProps {
  post: BlogPost
}

export function AnimatedBlogCard({ post }: AnimatedBlogCardProps) {
  return (
    <motion.article 
      className="card-glass h-full flex flex-col overflow-hidden hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-[1.02] relative"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/blog/${post.slug.current}`} className="block group flex-1 flex flex-col">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 p-6 flex flex-col relative z-10">
          <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
          
          <p className="text-gray-300 text-sm mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
            <time className="text-sm text-cyan-400 font-medium">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
            <span className="text-cyan-400 group-hover:text-purple-400 transition-colors font-medium text-sm">
              Read more →
            </span>
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
      </Link>
    </motion.article>
  )
}