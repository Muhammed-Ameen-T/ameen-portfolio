import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { miniProjects, projects } from '@/Data/Projects';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building scalable solutions with modern technologies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-8 mb-16"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="glass rounded-xl p-6 sm:p-8 hover:border-primary/50 transition-smooth group relative overflow-hidden"
            >
              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />
              
              <div className="relative z-10">
                {/* Header with Title and Badges */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                        <Code2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-smooth">
                          {project.title}
                        </h3>
                        {project.isOpenSource && (
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mt-2">
                            Open Source Contribution
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:flex-col">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-smooth"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        <span className="hidden sm:inline">GitHub</span>
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2 bg-primary hover:bg-primary/90 transition-smooth"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden sm:inline">Live Demo</span>
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Features Section */}
                <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
                  <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full"></span>
                    Key Features
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-muted-foreground">
                        <span className="text-primary mr-2 mt-0.5">▹</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-secondary/50 hover:bg-secondary/70 rounded-md text-xs font-medium text-foreground/90 transition-smooth cursor-default border border-transparent hover:border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mini Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="gradient-text">Mini Projects & More</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {miniProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass rounded-lg p-5 hover:border-primary/50 transition-smooth group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                <div className="relative z-10">
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-smooth flex items-center justify-between">
                    <span className="line-clamp-1">{project.title}</span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:bg-primary/10 rounded-md transition-smooth"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4 text-muted-foreground hover:text-primary transition-smooth" />
                    </a>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;