import { education } from '@/Data/Education';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="education" className="py-20 bg-background/50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Education & Learning</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development journey
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>

            <div className="space-y-12">
              {education.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-20"
                  >
                    {/* Icon */}
                    <div className="absolute left-0 w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center glow">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="glass rounded-lg p-6 hover:border-primary/50 transition-smooth">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <div className="text-primary font-semibold mb-1">{item.institution}</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {item.location} • {item.period}
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Future Work Experience
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 glass rounded-lg p-8 text-center border-2 border-dashed border-primary/30"
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Work Experience (Future)</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seeking my first full-time role to apply MERN stack expertise and contribute to
              innovative projects in a collaborative team environment.
            </p>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default Education;
