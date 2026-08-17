import React, { useRef, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from './components/HeroSection';
import LetterSection from './components/LetterSection';
import GallerySection from './components/GallerySection';
import GamesSection from './components/GamesSection';
import ClosingSection from './components/ClosingSection';
import MusicWidget from './components/MusicWidget';
import AuraBackground from './components/AuraBackground';
import EnvelopeIntro from './components/EnvelopeIntro';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);
  const heroRef = useRef(null);
  const letterRef = useRef(null);
  const galleryRef = useRef(null);
  const gamesRef = useRef(null);
  const closingRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-body text-brand-text bg-brand-bg w-full min-h-screen overflow-x-hidden selection:bg-brand-accent selection:text-white relative">
      {!hasEntered ? (
        <EnvelopeIntro onOpen={() => setHasEntered(true)} />
      ) : (
        <>
          <AuraBackground />
          <MusicWidget />

          <div ref={heroRef} id="hero">
            <HeroSection onNext={() => scrollTo(letterRef)} />
          </div>

          <div ref={letterRef} id="letter">
            <LetterSection onNext={() => scrollTo(galleryRef)} />
          </div>

          <div ref={galleryRef} id="gallery">
            <GallerySection onNext={() => scrollTo(gamesRef)} />
          </div>

          <div ref={gamesRef} id="games">
            <GamesSection onNext={() => scrollTo(closingRef)} />
          </div>

          <div ref={closingRef} id="closing">
            <ClosingSection />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
