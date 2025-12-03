import { useState, lazy, Suspense } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsMarquee from './components/SkillsMarquee';
import PageLoader from './components/PageLoader';

// Lazy load heavy components for better performance
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));
const GitHubGraph = lazy(() => import('./components/GitHubGraph'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));

// Simple loading skeleton
const ComponentSkeleton = () => (
  <div className="section-padding">
    <div className="container-wide">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-light-surface dark:bg-dark-surface rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-light-surface dark:bg-dark-surface rounded w-2/3 mx-auto"></div>
      </div>
    </div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <PageLoader onLoadingComplete={handleLoadingComplete} />}

      {!isLoading && (
        <>
          <CustomCursor />
          <Navbar />
          <main className="overflow-hidden">
            <Hero />
            <SkillsMarquee />
            <Suspense fallback={<ComponentSkeleton />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<ComponentSkeleton />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<ComponentSkeleton />}>
              <Certifications />
            </Suspense>
            <Suspense fallback={<ComponentSkeleton />}>
              <GitHubGraph />
            </Suspense>
            <Suspense fallback={<ComponentSkeleton />}>
              <ContactForm />
            </Suspense>
          </main>
          <Suspense fallback={<ComponentSkeleton />}>
            <Footer />
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;
