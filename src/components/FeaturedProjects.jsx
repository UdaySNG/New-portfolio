import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import useFetchProjects from '../hooks/useFetchProjects';

const FeaturedProjects = () => {
  const { projects, loading, error } = useFetchProjects();

  return (
    <section id="featured-projects" className="py-20 relative overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Featured Projects</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            A selection of my recent work, showcasing my skills in web development and design.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading projects...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">No projects found</div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects; 