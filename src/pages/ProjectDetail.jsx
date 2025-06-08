import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import Loading from '../components/Loading';

const BASE_URL = 'http://localhost:8000/api';

const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-accent/10">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600 dark:text-gray-400">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length <= 1) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={`http://localhost:8000/storage/${images[0]}`}
          alt="Project"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden">
      <img
        src={`http://localhost:8000/storage/${images[currentIndex]}`}
        alt="Project"
        className="w-full h-full object-cover"
      />
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        →
      </button>
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAccordion, setOpenAccordion] = useState('overview');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${BASE_URL}/projects/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const data = await response.json();
        setProject(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="min-h-screen bg-white dark:bg-dark pt-20 text-center text-red-400">{error}</div>;
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/projects"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <FaArrowLeft />
          <span>Back to Projects</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{project.title}</h1>
            </div>
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
          </div>

          <ImageSlider images={[project.image_url]} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AccordionItem
                title="Overview"
                isOpen={openAccordion === 'overview'}
                onClick={() => setOpenAccordion(openAccordion === 'overview' ? null : 'overview')}
              >
                {project.description}
              </AccordionItem>

              <AccordionItem
                title="Technologies"
                isOpen={openAccordion === 'tech'}
                onClick={() => setOpenAccordion(openAccordion === 'tech' ? null : 'tech')}
              >
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
              </AccordionItem>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-dark-lighter p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Project Links</h3>
                <div className="space-y-4">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
                    >
                      <FaGithub className="w-5 h-5" />
                      <span>View Source Code</span>
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
                      <span>View Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail; 