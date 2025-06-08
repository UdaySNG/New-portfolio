import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutPreview from './components/AboutPreview';
import FeaturedProjects from './components/FeaturedProjects';
import GetInTouch from './components/GetInTouch';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ThemeToggle from './components/ThemeToggle';

// Lazy load pages
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
  </div>
);

// Component to handle scroll behavior
const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen transition-colors duration-200">
        <ScrollToTopOnRouteChange />
        <Navbar />
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
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
