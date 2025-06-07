import { FaReact, FaCss3Alt, FaHeart } from 'react-icons/fa';
import { SiTailwindcss, SiFramer } from 'react-icons/si';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const techStack = [
    { name: 'React', icon: <FaReact className="w-6 h-6" />, color: 'text-[#61DAFB]' },
    { name: 'Tailwind', icon: <SiTailwindcss className="w-6 h-6" />, color: 'text-[#06B6D4]' },
    { name: 'Framer', icon: <SiFramer className="w-6 h-6" />, color: 'text-[#0055FF]' },
  ];

  return (
    <footer className="py-12 border-t border-dark-lighter relative overflow-hidden">
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
        <div className="flex flex-col items-center gap-8">
          {/* Tech Stack */}
          <div className="flex items-center gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`${tech.color} p-3 rounded-xl bg-dark-lighter/50 backdrop-blur-sm`}>
                    {tech.icon}
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-accent transition-colors duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Copyright */}
          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-gray-400">
              © {currentYear} Uday Singh. All rights reserved.
            </p>
            <motion.p 
              className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              Crafted with 
              <motion.span 
                className="text-accent inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaHeart />
              </motion.span>
              and modern web technologies
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 