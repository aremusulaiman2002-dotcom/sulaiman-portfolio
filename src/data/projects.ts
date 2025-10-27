export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Paramount Autos - Vehicle Booking Platform",
    description: "Full-stack vehicle rental platform with real-time admin dashboard, analytics, and booking management. Features Clerk authentication, PostgreSQL with Drizzle ORM, Recharts for analytics, and responsive admin interface with live updates.",
    image: "/images/projects/paramount-autos.jpg",
    technologies: [
      "Next.js 15", 
      "React 19", 
      "TypeScript", 
      "PostgreSQL", 
      "Drizzle ORM", 
      "Clerk Auth", 
      "Tailwind CSS 4", 
      "Recharts",
      "Shadcn/UI",
      "Vercel"
    ],
    category: "fullstack",
    liveUrl: "https://paramount-autos.vercel.app",
    githubUrl: "https://github.com/yourusername/paramount-autos",
    featured: true
  },
  {
    id: 2,
    title: "JMB Theogahr - Corporate Business Website",
    description: "Professional corporate website for a business consulting firm featuring comprehensive About section, service offerings, and company information. Built with Sanity CMS for dynamic content management, Resend for contact forms, and Framer Motion for engaging animations. Features responsive design and optimized performance.",
    image: "/images/projects/jmb-theogahr.jpg",
    technologies: [
      "Next.js 15", 
      "React 19", 
      "TypeScript", 
      "Tailwind CSS 4", 
      "Sanity CMS", 
      "Resend", 
      "Framer Motion", 
      "Vercel"
    ],
    category: "web",
    liveUrl: "https://jmb-theogahr-website.vercel.app",
    githubUrl: "https://github.com/yourusername/jmb-theogahr",
    featured: true
  },
  {
    id: 3,
    title: "Zone Autos Logistics - Premium Vehicle Rental Platform",
    description: "Full-stack vehicle rental management system with admin dashboard, real-time booking system, and inventory management. Features Next.js authentication, PostgreSQL database, and responsive UI with modern design patterns.",
    image: "/images/projects/zone-autos-logistics.jpg",
    technologies: ["Next.js 15", "TypeScript", "PostgreSQL", "Drizzle ORM", "NextAuth.js", "Tailwind CSS", "Shadcn/UI"],
    category: "fullstack",
    liveUrl: "https://zone-autos-logistics.vercel.app",
    githubUrl: "https://github.com/yourusername/zone-autos-logistics",
    featured: false
  },
  {
    id: 4,
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration, voice commands, and advanced messaging features using OpenAI API.",
    image: "/images/projects/ai-chat-app.jpg",
    technologies: ["Next.js", "OpenAI", "WebSockets", "Tailwind", "TypeScript"],
    category: "ai",
    liveUrl: "https://your-ai-chat-demo.com",
    githubUrl: "https://github.com/yourusername/ai-chat-app",
    featured: false
  },
  {
    id: 5,
    title: "Fitness Tracking Mobile App",
    description: "Cross-platform fitness tracking application with workout plans, progress analytics, and social features.",
    image: "/images/projects/fitness-app.jpg",
    technologies: ["React Native", "Firebase", "Redux", "Charts.js", "Node.js"],
    category: "mobile",
    liveUrl: "https://your-fitness-app.com",
    githubUrl: "https://github.com/yourusername/fitness-app",
    featured: false
  },
  {
    id: 6,
    title: "Task Management System",
    description: "Collaborative task management system with real-time updates, team collaboration, and project tracking.",
    image: "/images/projects/task-manager.jpg",
    technologies: ["React", "Socket.io", "MongoDB", "JWT", "Material-UI"],
    category: "web",
    liveUrl: "https://your-taskmanager-demo.com",
    githubUrl: "https://github.com/yourusername/task-management",
    featured: false
  }
];