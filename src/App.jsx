import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AboutPreview from './components/AboutPreview';
import FeaturedProjects from './components/FeaturedProjects';
import GetInTouch from './components/GetInTouch';
import Loading from './components/Loading.jsx';
import ScrollToTop from './components/ScrollToTop';
import ThemeToggle from './components/ThemeToggle';
import NotFound from './pages/NotFound';

// Lazy load pages
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  // Initialize dark mode
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router basename="/New-portfolio">
      <div className="min-h-screen bg-white dark:bg-dark transition-colors duration-300">
        <Navbar />
        <ScrollToTop />
        <ThemeToggle />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <AboutPreview />
              <FeaturedProjects />
              <GetInTouch />
            </>
          } />
          <Route path="/about" element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          } />
          <Route path="/services" element={
            <Suspense fallback={<Loading />}>
              <Services />
            </Suspense>
          } />
          <Route path="/projects" element={
            <Suspense fallback={<Loading />}>
              <Projects />
            </Suspense>
          } />
          <Route path="/projects/:id" element={
            <Suspense fallback={<Loading />}>
              <ProjectDetail />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<Loading />}>
              <Contact />
            </Suspense>
          } />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
