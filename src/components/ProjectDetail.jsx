import { motion } from 'framer-motion';
import { useFetchProjectDetail } from '../hooks/useFetchProjectDetail';
import Loading from './Loading';
import GlowingImage from './GlowingImage';

const ProjectDetail = ({ projectId }) => {
  const { project, loading, error } = useFetchProjectDetail(projectId);

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loading text="Loading project details..." compact />
    </div>
  );
  if (error) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loading text="Loading project details..." compact error={error} />
    </div>
  );

  return (
    <section className="py-20 bg-white dark:bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-4 text-primary">{project.title}</h1>
          <p className="text-secondary mb-8">{project.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Technologies</h2>
              <ul className="list-disc list-inside text-secondary">
                {project.technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Features</h2>
              <ul className="list-disc list-inside text-secondary">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            {project.images.map((image, index) => (
              <GlowingImage
                key={index}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail; 