'use client';
import { motion } from 'framer-motion';
import { Code, Database, Palette, Smartphone, Cloud, Server } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code,
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
      icon: Server,
      title: "Backend Development",
      skills: [
      { name: "Node.js", level: 88 },
      { name: "Python/Django", level: 82 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 80 }
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: [
      { name: "React Native", level: 87 },
      { name: "Flutter", level: 80 },
      { name: "iOS/Android", level: 83 },
      { name: "Cross-platform", level: 85 }
      ]
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud",
      skills: [
      { name: "AWS", level: 83 },
      { name: "Docker", level: 80 },
      { name: "CI/CD", level: 82 },
      { name: "Linux", level: 85 },
      ]
    },
    {
      icon: Database,
      title: "Database Management",
      skills: [
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 75 },
      { name: "Database Design", level: 87 }
      ]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      skills: [
      { name: "Figma", level: 85 },
      { name: "Adobe XD", level: 80 },
      { name: "Prototyping", level: 82 },
      { name: "Design Systems", level: 83 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical <span className="text-cyan-400">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Here's a comprehensive overview of my technical expertise across various technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-cyan-500/20"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent size={24} className="text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-cyan-400 text-sm font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;