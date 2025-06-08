import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const SocialLinks = ({ className = '' }) => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/your-profile',
      icon: <FaLinkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      description: 'Connect with me',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/your-username',
      icon: <FaGithub className="w-6 h-6" />,
      label: 'GitHub',
      description: 'Check out my projects',
    },
    {
      name: 'Email',
      href: 'mailto:your.email@example.com',
      icon: <EnvelopeIcon className="w-6 h-6" />,
      label: 'Email',
      description: 'Send me a mail',
    },
  ];

  return (
    <div className={`flex justify-center items-center gap-12 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center text-gray-500 dark:text-gray-400 hover:text-accent"
          aria-label={link.name}
        >
          <div className="p-2">
            <div className="transform transition-transform duration-500 ease-in-out group-hover:translate-x-[-1rem] text-gray-500 dark:text-gray-400 group-hover:text-accent">
              {link.icon}
            </div>
          </div>
          <div className="max-w-0 group-hover:max-w-[200px] overflow-hidden transition-all duration-500 ease-in-out">
            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-x-[-100%] group-hover:translate-x-0 text-left">
              <div className="text-sm font-medium whitespace-nowrap text-left text-gray-700 dark:text-gray-300">{link.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap text-left">{link.description}</div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks; 