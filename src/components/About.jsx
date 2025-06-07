import { motion } from 'framer-motion';
import { FaCode, FaServer, FaTools } from 'react-icons/fa';

const About = () => {
  const skills = [
    {
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.',
      icon: <FaCode className="w-6 h-6" />
    },
    {
      title: 'Backend Development',
      description: 'Creating robust server-side applications using Node.js, Express, and various databases.',
      icon: <FaServer className="w-6 h-6" />
    },
    {
      title: 'Tools & Technologies',
      description: 'Proficient in Git, Docker, AWS, and other modern development tools and practices.',
      icon: <FaTools className="w-6 h-6" />
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">About Me</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            I'm a passionate Full Stack Developer with a keen eye for creating elegant solutions 
            to complex problems. With a strong foundation in both frontend and backend development, 
            I strive to build applications that are not only functional but also provide an 
            exceptional user experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="container-card hover:shadow-lg transition-all duration-200"
            >
              <div className="text-accent mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{skill.title}</h3>
              <p className="text-secondary">{skill.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
            or sharing my knowledge through technical writing. I believe in continuous learning and staying 
            up-to-date with the latest industry trends.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 