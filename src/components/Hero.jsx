import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaDownload, FaCode, FaServer, FaTools } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const TypewriterText = ({ text, delay = 100, startDelay = 0 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text, startDelay]);

  return <span>{currentText}</span>;
};

const Hero = () => {
  const skills = [
    { icon: <FaCode className="w-5 h-5" />, text: "Frontend" },
    { icon: <FaServer className="w-5 h-5" />, text: "Backend" },
    { icon: <FaTools className="w-5 h-5" />, text: "DevOps" }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative inline-block"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 group">
              <span className="inline-block">
                <TypewriterText text="Hi, I'm Uday Singh" delay={100} />
              </span>
              <span className="text-accent relative inline-block">
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-accent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-400 mb-4"
          >
            Full Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Crafting modern web experiences with clean code and creative solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to="/projects"
              className="group bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              View Projects
            </Link>
            <a
              href="/resume.pdf"
              download
              className="group flex items-center justify-center gap-2 bg-dark-lighter hover:bg-dark-lighter/80 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
            >
              <FaDownload className="w-4 h-4 group-hover:animate-bounce" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex justify-center gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2 group cursor-default"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 rounded-full bg-dark-lighter/50 group-hover:bg-accent/10 transition-colors">
                  {skill.icon}
                </div>
                <span className="text-sm text-gray-400 group-hover:text-accent transition-colors">
                  {skill.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 