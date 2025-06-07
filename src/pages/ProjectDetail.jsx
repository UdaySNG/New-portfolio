import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useFetchProjects from '../hooks/useFetchProjects';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-accent/10">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
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
            <div className="pb-4 text-gray-400">{children}</div>
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
          src={images[0]}
          alt="Project"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Project image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-dark/80 text-white p-2 rounded-full hover:bg-dark transition-colors"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-dark/80 text-white p-2 rounded-full hover:bg-dark transition-colors"
      >
        →
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, loading, error } = useFetchProjects();
  const [openAccordion, setOpenAccordion] = useState('overview');

  const project = projects?.find((p) => p.title.toLowerCase().replace(/\s+/g, '-') === id);

  if (loading) return <div className="min-h-screen bg-dark pt-20 text-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-dark pt-20 text-center text-red-400">{error}</div>;
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
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

  const accordionItems = [
    {
      id: 'overview',
      title: 'Overview',
      content: project.description,
    },
    {
      id: 'team',
      title: 'Team Information',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Project Type:</span>
            <span>{project.isTeamProject ? 'Team Project' : 'Individual Project'}</span>
          </div>
          {project.isTeamProject && (
            <>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Team Size:</span>
                <span>{project.teamSize} people</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">My Role:</span>
                <span>{project.role}</span>
              </div>
              {project.teamResponsibilities && (
                <div>
                  <span className="font-semibold block mb-2">Team Responsibilities:</span>
                  <ul className="list-disc list-inside space-y-1">
                    {project.teamResponsibilities.map((resp, index) => (
                      <li key={index} className="text-gray-300">{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      ),
    },
    {
      id: 'features',
      title: 'Key Features',
      content: project.features?.join('\n') || 'No features listed',
    },
    {
      id: 'tech',
      title: 'Technologies',
      content: project.techStack.join(', '),
    },
    {
      id: 'challenges',
      title: 'Challenges & Solutions',
      content: project.challenges || 'No challenges listed',
    },
  ];

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/projects"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
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
              <h1 className="text-4xl font-bold">{project.title}</h1>
              {project.isTeamProject && (
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                  Team Project
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <ImageSlider images={project.images || [project.image]} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {accordionItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  title={item.title}
                  isOpen={openAccordion === item.id}
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                >
                  {item.content}
                </AccordionItem>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-dark-lighter p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Project Links</h3>
                <div className="space-y-4">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-accent hover:bg-accent/90 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    View Live Demo
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-dark hover:bg-dark-lighter border border-accent/20 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      View Source Code
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