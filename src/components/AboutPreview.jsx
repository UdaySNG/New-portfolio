import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const AboutPreview = () => {
  return (
    <section className="py-20 relative overflow-hidden">
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
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Wie ben ik?</h2>
          <p className="text-secondary max-w-2xl mx-auto mb-8">
            Ik ben een software developer in opleiding bij Mediacollege Amsterdam. Momenteel volg ik de MBO 4 opleiding Software Development en loop ik stage bij 12build. Ik ben gepassioneerd over moderne web technologieën en het bouwen van gebruiksvriendelijke applicaties.
          </p>
          <Link 
            to="/about" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Lees meer over mij
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview; 