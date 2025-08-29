export interface SkillCategory {
  icon: string;
  title: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number;
}

export const skillCategories: SkillCategory[] = [
  {
    icon: "💻",
    title: "Frontend Development",
    skills: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Vue.js", level: 85 },
      { name: "HTML/CSS", level: 98 }
    ]
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Python/Django", level: 82 },
      { name: "PostgreSQL", level: 75 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 80 }
    ]
  },
  {
    icon: "📱",
    title: "Mobile Development",
    skills: [
      { name: "React Native", level: 87 },
      { name: "Flutter", level: 80 },
      { name: "iOS/Android", level: 83 },
      { name: "Cross-platform", level: 85 }
    ]
  },
  {
    icon: "☁️",
    title: "DevOps & Cloud",
    skills: [
      { name: "AWS", level: 83 },
      { name: "Docker", level: 80 },
      { name: "CI/CD", level: 82 },
      { name: "Linux", level: 85 },
      { name: "Nginx", level: 78 }
    ]
  },
  {
    icon: "🗄️",
    title: "Database Management",
    skills: [
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 75 },
      { name: "Database Design", level: 87 }
    ]
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Adobe XD", level: 80 },
      { name: "Prototyping", level: 82 },
      { name: "Design Systems", level: 83 }
    ]
  }
];