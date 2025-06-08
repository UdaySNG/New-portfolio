import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="container-card overflow-hidden group"
    >
      <div className="relative">
        <img
          src={`http://localhost:8000/storage/${project.image_url}`}
          alt={project.title}
          className="w-full h-48 object-cover"
          loading="lazy"
          width="400"
          height="300"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors"
              title="View Source Code"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors"
              title="View Live Demo"
            >
              <FaExternalLinkAlt className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-primary">{project.title}</h3>
        <p className="text-secondary mb-4">{project.description}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4">
          <Link
            to={`/projects/${project.id}`}
            className="text-accent hover:text-accent/80 transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 