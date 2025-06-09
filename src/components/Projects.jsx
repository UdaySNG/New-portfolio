import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import Loading from './Loading';
import useFetchProjects from '../hooks/useFetchProjects';
import useFetchCategories from '../hooks/useFetchCategories';

const Projects = () => {
  const { projects, loading: projectsLoading, isUsingFallback: isUsingProjectsFallback, error: projectsError } = useFetchProjects();
  const { categories, loading: categoriesLoading, isUsingFallback: isUsingCategoriesFallback, error: categoriesError } = useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (projects && categories) {
      if (selectedCategory === 'all') {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(projects.filter(project => project.category === selectedCategory));
      }
    }
  }, [projects, categories, selectedCategory]);

  if (projectsLoading || categoriesLoading) {
    return <Loading text="Loading projects..." />;
  }

  if (projectsError || categoriesError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">
          {projectsError || categoriesError}
        </p>
        <p className="text-gray-600">
          {isUsingProjectsFallback || isUsingCategoriesFallback ? 'Using fallback data.' : ''}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-center mb-4">Projects</h1>
        <p className="text-gray-600 text-center">
          {isUsingProjectsFallback || isUsingCategoriesFallback ? 'Using fallback data.' : ''}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  );
};

export default Projects; 