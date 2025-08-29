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
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features user authentication, payment processing, and admin dashboard.",
    image: "/images/projects/ecommerce-platform.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
    category: "web",
    liveUrl: "https://your-ecommerce-demo.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    featured: true
  },
  {
    id: 2,
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration, voice commands, and advanced messaging features using OpenAI API.",
    image: "/images/projects/ai-chat-app.jpg",
    technologies: ["Next.js", "OpenAI", "WebSockets", "Tailwind", "TypeScript"],
    category: "ai",
    liveUrl: "https://your-ai-chat-demo.com",
    githubUrl: "https://github.com/yourusername/ai-chat-app",
    featured: true
  },
  {
    id: 3,
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
    id: 4,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics dashboard with real-time data visualization, reporting tools, and custom metrics.",
    image: "/images/projects/analytics-dashboard.jpg",
    technologies: ["Vue.js", "D3.js", "Express", "PostgreSQL", "Chart.js"],
    category: "web",
    liveUrl: "https://your-analytics-demo.com",
    githubUrl: "https://github.com/yourusername/analytics-dashboard",
    featured: false
  },
  {
    id: 5,
    title: "Task Management System",
    description: "Collaborative task management system with real-time updates, team collaboration, and project tracking.",
    image: "/images/projects/task-manager.jpg",
    technologies: ["React", "Socket.io", "MongoDB", "JWT", "Material-UI"],
    category: "web",
    liveUrl: "https://your-taskmanager-demo.com",
    githubUrl: "https://github.com/yourusername/task-management",
    featured: true
  },
  {
    id: 6,
    title: "Weather Forecast App",
    description: "Beautiful weather application with location-based forecasts, severe weather alerts, and historical data.",
    image: "/images/projects/weather-app.jpg",
    technologies: ["React", "Weather API", "Geolocation", "CSS3", "Axios"],
    category: "web",
    liveUrl: "https://your-weather-app.com",
    githubUrl: "https://github.com/yourusername/weather-app",
    featured: false
  }
];