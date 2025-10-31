import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Code2,
  Database,
  Layout,
  Server,
  Cloud,
  Boxes,
  Brain,
  Zap,
} from 'lucide-react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Back-End',
      icon: Server,
      skills: ['Node.js', 'Express.js', 'TypeScript', 'JavaScript', 'RESTful API'],
    },
    {
      title: 'Front-End',
      icon: Layout,
      skills: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind', 'Bootstrap', 'HTML', 'CSS', 'ShadCN'],
    },
    {
      title: 'Databases & ORM',
      icon: Database,
      skills: ['MongoDB', 'PostgreSQL', 'Mongoose', 'Redis', 'Firebase'],
    },
    {
      title: 'Cloud & Deployment',
      icon: Cloud,
      skills: ['AWS EC2', 'Nginx', 'Vercel', 'Docker'],
    },
    {
      title: 'Architecture',
      icon: Boxes,
      skills: ['Clean Architecture', 'MVC Architecture', 'Repository Pattern', 'SOLID Principles'],
    },
    {
      title: 'Additional Skills',
      icon: Brain,
      skills: ['Problem-solving (LeetCode)', 'Quick Learning', 'Adaptability', 'DSA'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="py-20 bg-background/50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable web applications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="glass rounded-lg p-6 hover:border-primary/50 transition-smooth group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-smooth">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary/50 rounded-full text-sm text-foreground/90 hover:bg-primary/20 hover:text-primary transition-smooth cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
