import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import useFetchProjects from '../hooks/useFetchProjects';
import useFetchCategories from '../hooks/useFetchCategories';
import ProjectCard from '../components/ProjectCard';
import Loading from '../components/Loading';

const Projects = () => {
  const { projects, loading: projectsLoading, isUsingFallback: isUsingProjectsFallback, error: projectsError } = useFetchProjects();
  const { categories, loading: categoriesLoading, isUsingFallback: isUsingCategoriesFallback, error: categoriesError } = useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState([]);

  const loading = projectsLoading || categoriesLoading;
  const error = projectsError || categoriesError;
  const isUsingFallback = isUsingProjectsFallback || isUsingCategoriesFallback;

  // Get unique technologies from all projects
  const availableTech = [...new Set(projects?.flatMap(project => 
    project.tags?.map(tag => tag.name) || []
  ) || [])];

  const categoryMapping = {
    'Web Development': 'web',
    'Mobile Development': 'mobile',
    'Design': 'design',
    'Other': 'other'
  };

  const filteredProjects = projects?.filter(project => {
    const matchesCategory = selectedCategory === 'all' || 
      (project.category && project.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech.length === 0 || 
                       (project.tags || []).some(tag => selectedTech.includes(tag.name));
    
    return matchesCategory && matchesSearch && matchesTech;
  });

  const toggleTech = (tech) => {
    setSelectedTech(prev => 
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedTech([]);
  };

  if (loading) return <Loading text="Fetching projects..." />;
  if (error && !isUsingFallback) return <div className="min-h-screen bg-white dark:bg-dark pt-20 text-center text-red-400">{error}</div>;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">My Projects</h1>
          <p className="text-secondary max-w-2xl mx-auto">
            A collection of my work, showcasing my skills and experience in various technologies.
          </p>
        </motion.div>

        {/* Filter Icon */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-3 text-accent hover:text-accent/80 transition-colors"
            title="Filter Projects"
          >
            <FaFilter className="w-6 h-6" />
          </button>
        </div>

        {/* Expandable Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-white dark:bg-dark-lighter rounded-lg mb-8"
            >
              <div className="p-6">
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-secondary">Search</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or description..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-lighter text-gray-900 dark:text-white"
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-secondary">Category</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                        selectedCategory === 'all'
                          ? 'text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                      style={{
                        backgroundColor: selectedCategory === 'all'
                          ? '#6366f1'
                          : '#6366f115',
                        border: '1px solid #6366f130',
                        boxShadow: '0 2px 4px #6366f110'
                      }}
                    >
                      All
                    </button>
                    {categories?.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                          selectedCategory === category.name
                            ? 'text-white'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                        style={{
                          backgroundColor: selectedCategory === category.name
                            ? '#6366f1'
                            : '#6366f115',
                          border: '1px solid #6366f130',
                          boxShadow: '0 2px 4px #6366f110'
                        }}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-secondary">Technologies</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTech.map(tech => {
                      const tag = projects?.find(p => p.tags?.some(t => t.name === tech))?.tags?.find(t => t.name === tech);
                      return (
                        <button
                          key={tech}
                          onClick={() => toggleTech(tech)}
                          className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                            selectedTech.includes(tech)
                              ? 'text-white'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                          style={{
                            backgroundColor: selectedTech.includes(tech)
                              ? tag?.color || '#6366f1'
                              : `${tag?.color || '#6366f1'}15`,
                            border: `1px solid ${tag?.color || '#6366f1'}30`,
                            boxShadow: `0 2px 4px ${tag?.color || '#6366f1'}10`
                          }}
                        >
                          {tech}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        {filteredProjects && filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
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
        ) : (
          <div className="text-center text-gray-400">No projects found</div>
        )}
      </div>
    </div>
  );
};

export default Projects; 