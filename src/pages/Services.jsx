import { motion } from 'framer-motion';
import { FaCode, FaMobile, FaServer, FaTools, FaRocket, FaHeadset } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Services = () => {
  const [selectedBudget, setSelectedBudget] = useState('medium');
  const [sliderValue, setSliderValue] = useState(5000);
  const [sliderLabel, setSliderLabel] = useState('€5,000');

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    setSliderLabel(`€${value.toLocaleString()}`);
    
    // Update selected budget based on slider value
    if (value <= 3000) setSelectedBudget('small');
    else if (value <= 7000) setSelectedBudget('medium');
    else if (value <= 15000) setSelectedBudget('large');
    else setSelectedBudget('enterprise');
  };

  const pricingRanges = {
    small: {
      range: '€1,000 - €3,000',
      time: '2-4 weeks',
      features: [
        'Basic website or landing page',
        'Simple contact form',
        'Mobile responsive design',
        'Basic SEO optimization',
        '1-2 revision rounds'
      ]
    },
    medium: {
      range: '€3,000 - €7,000',
      time: '4-8 weeks',
      features: [
        'Custom web application',
        'User authentication',
        'Database integration',
        'Advanced UI/UX design',
        '3-4 revision rounds',
        'Basic analytics'
      ]
    },
    large: {
      range: '€7,000 - €15,000',
      time: '8-16 weeks',
      features: [
        'Complex web application',
        'Custom API development',
        'Advanced security features',
        'Real-time functionality',
        'Advanced analytics',
        '5+ revision rounds',
        'Performance optimization',
        'Documentation'
      ]
    },
    enterprise: {
      range: '€15,000+',
      time: '16+ weeks',
      features: [
        'Enterprise-grade solution',
        'Custom architecture',
        'Advanced security protocols',
        'Scalable infrastructure',
        '24/7 monitoring',
        'Unlimited revision rounds',
        'Comprehensive documentation',
        'Training & support',
        'Maintenance plan'
      ]
    }
  };

  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies.',
      icon: <FaCode className="w-8 h-8" />,
      technologies: ['React', 'Node.js', 'Next.js', 'TypeScript']
    },
    {
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications.',
      icon: <FaMobile className="w-8 h-8" />,
      technologies: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
      title: 'Backend Development',
      description: 'Robust server-side solutions with scalable architecture.',
      icon: <FaServer className="w-8 h-8" />,
      technologies: ['Node.js', 'Python', 'Java', 'Go']
    },
    {
      title: 'Maintenance & Support',
      description: 'Ongoing support and maintenance for your applications.',
      icon: <FaTools className="w-8 h-8" />,
      technologies: ['Monitoring', 'Updates', 'Security', 'Performance']
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Services & Pricing</h1>
          <p className="text-secondary max-w-2xl mx-auto">
            Transparent pricing structure to help you understand what to expect at different budget levels.
          </p>
        </motion.div>

        {/* Services Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-lighter rounded-lg p-6 shadow-lg dark:shadow-none"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{service.title}</h3>
              <p className="text-secondary mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-dark rounded text-sm text-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Structure */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Budget Ranges</h2>
          
          {/* Budget Slider */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-secondary">€1,000</span>
              <span className="text-xl font-semibold text-accent">{sliderLabel}</span>
              <span className="text-secondary">€20,000+</span>
            </div>
            <div className="relative py-2">
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 dark:bg-dark rounded-lg appearance-none cursor-pointer accent-accent
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-accent
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-white
                  [&::-webkit-slider-thumb]:dark:border-dark-lighter
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-webkit-slider-thumb]:-mt-1.5
                  [&::-moz-range-thumb]:appearance-none
                  [&::-moz-range-thumb]:w-5
                  [&::-moz-range-thumb]:h-5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-accent
                  [&::-moz-range-thumb]:border-2
                  [&::-moz-range-thumb]:border-white
                  [&::-moz-range-thumb]:dark:border-dark-lighter
                  [&::-moz-range-thumb]:shadow-lg
                  [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:transition-all
                  [&::-moz-range-thumb]:hover:scale-110"
              />
              <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-accent/20 rounded-lg pointer-events-none"></div>
              <div 
                className="absolute top-1/2 left-0 h-2 -translate-y-1/2 bg-accent rounded-lg pointer-events-none transition-all duration-200"
                style={{ width: `${((sliderValue - 1000) / 19000) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-secondary">
              <span>Small</span>
              <span>Medium</span>
              <span>Large</span>
              <span>Enterprise</span>
            </div>
          </div>

          {/* Budget Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.keys(pricingRanges).map((range) => (
              <button
                key={range}
                onClick={() => {
                  setSelectedBudget(range);
                  // Set slider value based on range
                  switch(range) {
                    case 'small': setSliderValue(2000); break;
                    case 'medium': setSliderValue(5000); break;
                    case 'large': setSliderValue(10000); break;
                    case 'enterprise': setSliderValue(15000); break;
                  }
                }}
                className={`p-4 rounded-lg text-center transition-all ${
                  selectedBudget === range
                    ? 'bg-accent text-white'
                    : 'bg-white dark:bg-dark-lighter text-secondary hover:bg-gray-50 dark:hover:bg-dark'
                }`}
              >
                <div className="font-semibold capitalize mb-1">{range}</div>
                <div className="text-sm">{pricingRanges[range].range}</div>
              </button>
            ))}
          </div>

          {/* Selected Budget Details */}
          <motion.div
            key={selectedBudget}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-lighter rounded-lg p-8 shadow-lg dark:shadow-none"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-primary capitalize mb-2">{selectedBudget} Budget</h3>
                <p className="text-accent font-semibold">{pricingRanges[selectedBudget].range}</p>
              </div>
              <div className="text-right">
                <p className="text-secondary">Estimated Time</p>
                <p className="text-xl font-semibold text-primary">{pricingRanges[selectedBudget].time}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary mb-4">What's Included:</h4>
              <ul className="space-y-3">
                {pricingRanges[selectedBudget].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                    </span>
                    <span className="text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">Need a Custom Solution?</h2>
          <p className="text-secondary mb-8 max-w-2xl mx-auto">
            Every project is unique. Contact me to discuss your specific requirements and get a tailored quote.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Services; 