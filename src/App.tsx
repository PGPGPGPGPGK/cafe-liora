import { useState } from 'react';
import Courtyard from './components/Courtyard';
import EatSip from './components/EatSip';
import Experiences from './components/Experiences';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Nav from './components/Nav';
import Pickleball from './components/Pickleball';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <a
        href="#eat-sip"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero ready={introDone} />
        <Courtyard />
        <EatSip />
        <Pickleball />
        <Experiences />
      </main>
      <Footer />
    </>
  );
}
