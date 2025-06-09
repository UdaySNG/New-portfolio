import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const hasLinks = project.github_url || project.live_url;
  const hasTags = project.tags && project.tags.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-white dark:bg-dark-lighter rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 h-[500px] flex flex-col"
    >
      {/* Project Image with Gradient Overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={`http://localhost:8000/storage/${project.image_url}`}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          width="400"
          height="300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark-lighter via-white/50 dark:via-dark-lighter/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Actions */}
        {hasLinks && (
          <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                title="View Source Code"
              >
                <FaGithub className="w-6 h-6" />
              </motion.a>
            )}
            {project.live_url && (
              <motion.a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                title="View Live Demo"
              >
                <FaExternalLinkAlt className="w-6 h-6" />
              </motion.a>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-primary group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-secondary mb-4 line-clamp-2">{project.description}</p>
        
        {/* Tags */}
        {hasTags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: `${tag.color}15`,
                  color: tag.color,
                  border: `1px solid ${tag.color}30`
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* View Details Link */}
        <div className="flex items-center justify-between mt-auto">
          <Link
            to={`/projects/${project.id}`}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 text-accent font-medium">View Details</span>
            <span className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300">
              <svg 
                className="w-5 h-5 text-accent" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-accent/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        </div>
      </div>

      {/* Accent Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default ProjectCard; 