import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import useFetchFeaturedProjects from '../hooks/useFetchFeaturedProjects';
import Loading from './Loading';

const FeaturedProjects = () => {
  const { projects, loading, error } = useFetchFeaturedProjects();

  return (
    <section className="py-20 bg-white dark:bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-primary">Featured Projects</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Check out some of my best work, showcasing my skills and experience.
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${loading ? 'min-h-[400px]' : ''}`}>
          {loading ? (
            <div className="col-span-full flex items-center justify-center">
              <Loading text="Loading featured projects..." compact />
            </div>
          ) : error ? (
            <div className="col-span-full flex items-center justify-center">
              <Loading text="Loading featured projects..." compact error={error} />
            </div>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects; 