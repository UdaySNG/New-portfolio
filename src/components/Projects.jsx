import { motion } from 'framer-motion';
import { useFetchProjects } from '../hooks/useFetchProjects';
import ProjectCard from './ProjectCard';
import Loading from './Loading';

const Projects = () => {
  const { projects, loading, error } = useFetchProjects();

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loading text="Loading projects..." compact />
    </div>
  );
  if (error) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loading text="Loading projects..." compact error={error} />
    </div>
  );

  return (
    <section className="py-20 bg-white dark:bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-primary">Projects</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Explore my portfolio of projects, showcasing my skills and experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 