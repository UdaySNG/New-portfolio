import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useFetchProjects from '../hooks/useFetchProjects';
import useFetchCategories from '../hooks/useFetchCategories';

const Projects = () => {
  const { projects, loading: projectsLoading, error: projectsError } = useFetchProjects();
  const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState([]);

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
    console.log('Project category:', project.category);
    console.log('Selected category:', selectedCategory);
    const matchesCategory = selectedCategory === 'all' || 
      (project.category && project.category.toLowerCase() === (categoryMapping[selectedCategory] || selectedCategory).toLowerCase());
    console.log('Matches category:', matchesCategory);
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

  const loading = projectsLoading || categoriesLoading;
  const error = projectsError || categoriesError;

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
                      className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-accent text-white'
                          : 'bg-gray-100 dark:bg-dark-lighter text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-lighter/80'
                      }`}
                    >
                      All
                    </button>
                    {categories?.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                          selectedCategory === category.name
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 dark:bg-dark-lighter text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-lighter/80'
                        }`}
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
                    {availableTech.map(tech => (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedTech.includes(tech)
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 dark:bg-dark-lighter text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-lighter/80'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
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
        {loading ? (
          <div className="text-center text-gray-400">Loading projects...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : filteredProjects && filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden group shadow-lg dark:shadow-none"
              >
                <div className="relative">
                  <img
                    src={`http://localhost:8000/storage/${project.image_url}`}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-accent transition-colors"
                      title="View Source Code"
                    >
                      <FaGithub className="w-6 h-6" />
                    </a>
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-accent transition-colors"
                      title="View Live Demo"
                    >
                      <FaExternalLinkAlt className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{project.title}</h3>
                  <p className="text-secondary mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
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