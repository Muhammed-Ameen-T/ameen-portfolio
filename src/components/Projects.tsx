import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      title: 'Cenify - Theater Movie Ticket Booking',
      description:
        'A comprehensive movie ticket booking platform with real-time seat selection and wallet system.',
      features: [
        'Modular Clean Architecture',
        'RESTful APIs with Express.js/TypeScript',
        'Real-time Seat Booking (Socket.IO)',
        'Wallet System & JWT Authentication',
        'Docker deployment on AWS EC2',
      ],
      techStack: [
        'Node.js',
        'TypeScript',
        'Express',
        'MongoDB',
        'React',
        'Redux',
        'Redis',
        'Socket.IO',
        'Stripe',
        'Docker',
        'AWS EC2',
        'Vercel',
      ],
    },
    {
      title: 'Rozeto - E-commerce Platform',
      description:
        'Full-featured e-commerce website with advanced product management and payment integration.',
      features: [
        'Complete E-commerce functionality',
        'Returns & Refunds system',
        'Offers & Discounts management',
        'Admin Panel',
        'Razorpay Payment Integration',
        'AWS EC2 Deployment',
      ],
      techStack: ['Node.js', 'JavaScript', 'Express', 'MongoDB', 'Razorpay', 'AWS EC2'],
    },
    {
      title: 'Inker - Blogging Platform',
      description:
        'Open source contribution to a blogging platform, implementing engagement features.',
      features: [
        'Upvote/Downvote feature implementation',
        'MongoDB atomic operations',
        'Secure vote counting',
        'MERN Stack implementation',
      ],
      techStack: ['MongoDB', 'Express', 'React', 'Node.js'],
      isOpenSource: true,
    },
  ];

  const miniProjects = [
    {
      title: 'Discord Git Webhook Chat Bot',
      description: 'Automated notifications for repository activities',
    },
    {
      title: 'Chrome Extension - Swift API Tester',
      description: 'Quick and efficient API testing tool',
    },
    {
      title: 'Stock Image Platform',
      description: 'Bulk upload & editor with Next.js and Cloudinary integration',
    },
    {
      title: 'Aadhaar OCR Parser',
      description: 'Document parsing and data extraction tool',
    },
  ];

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
              className="glass rounded-lg p-6 sm:p-8 hover:border-primary/50 transition-smooth group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-smooth">
                    {project.title}
                  </h3>
                  {project.isOpenSource && (
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-2">
                      Open Source Contribution
                    </span>
                  )}
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-primary mb-2">Key Features:</h4>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-primary mr-2">▹</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary/50 rounded-full text-xs text-foreground/90"
                  >
                    {tech}
                  </span>
                ))}
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
                className="glass rounded-lg p-4 hover:border-primary/50 transition-smooth group"
              >
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-smooth">
                  {project.title}
                </h4>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
