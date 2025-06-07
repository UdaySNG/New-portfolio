import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import SocialLinks from '../components/SocialLinks';
import useFetchProjects from '../hooks/useFetchProjects';

const Home = () => {
  const { projects, loading, error } = useFetchProjects();

  return (
    <div className="bg-dark min-h-screen">
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A collection of my recent work, showcasing my skills in web development and design.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-gray-400">Loading projects...</div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-lighter">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Interested in working together? Let's connect and discuss your project.
            </p>
            <SocialLinks />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 