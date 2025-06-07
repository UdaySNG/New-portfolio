import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const Timeline = () => {
  const experiences = [
    {
      type: 'work',
      title: 'Full Stack Developer',
      company: 'Company Name',
      period: '2022 - Present',
      description: 'Led development of multiple web applications using React, Node.js, and MongoDB. Implemented CI/CD pipelines and improved application performance by 40%.',
      icon: <FaBriefcase className="w-5 h-5" />
    },
    {
      type: 'education',
      title: 'Bachelor of Computer Science',
      company: 'University Name',
      period: '2018 - 2022',
      description: 'Graduated with honors. Specialized in Software Engineering and Web Development. Participated in multiple hackathons and coding competitions.',
      icon: <FaGraduationCap className="w-5 h-5" />
    },
    {
      type: 'work',
      title: 'Junior Developer',
      company: 'Previous Company',
      period: '2021 - 2022',
      description: 'Developed and maintained web applications. Collaborated with cross-functional teams to deliver high-quality software solutions.',
      icon: <FaBriefcase className="w-5 h-5" />
    }
  ];

  return (
    <section id="timeline" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-accent/5"
            initial={{ x: -100, y: Math.random() * 100 }}
            animate={{
              x: ['-100%', '100%'],
              y: [Math.random() * 100, Math.random() * 100],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Experience & Education</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            My professional journey and educational background that shaped my career in technology.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent" />

                {/* Content */}
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? 'mr-auto pr-12' : 'ml-auto pl-12'
                  }`}
                >
                  <div className="container-card">
                    <div className="flex items-center gap-2 mb-2">
                      {item.icon}
                      <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                    </div>
                    <p className="text-accent mb-2">{item.company}</p>
                    <p className="text-muted text-sm mb-3">{item.period}</p>
                    <p className="text-secondary">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline; 