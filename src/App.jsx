import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import PageLoader from './components/PageLoader';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import SectionDots from './components/SectionDots';

function App() {
  return (
    <>
      {/* Premium UI extras */}
      <PageLoader />
      <ScrollProgress />
      <CustomCursor />
      <BackToTop />
      <SectionDots />

      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Navbar />

      <main className="page-wrapper">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      <footer className="footer">
        <p>
          Designed &amp; built by{' '}
          <a
            href="https://www.linkedin.com/in/dinesh-karthick-94a920295"
            target="_blank"
            rel="noreferrer"
          >
            Dinesh Karthick
          </a>{' '}
          · 2025
        </p>
      </footer>
    </>
  );
}

export default App;
