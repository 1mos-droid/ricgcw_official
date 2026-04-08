import { motion } from 'framer-motion';
import Hero from './sections/Hero';
import About from './sections/About';
import Ministries from './sections/Ministries';
import MediaHub from './sections/MediaHub';
import Events from './sections/Events';
import Connect from './sections/Connect';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="relative min-h-screen bg-ios-bg">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Ministries />
        <MediaHub />
        <Events />
        <Connect />
      </main>

      <footer className="py-12 px-6 text-center border-t border-ios-separator/10 bg-white/50 backdrop-blur-md">
        <p className="ios-caption">© 2026 Inner Court Gospel Church Worldwide. All rights reserved.</p>
        <p className="text-[10px] font-bold uppercase tracking-widest mt-2 opacity-30">Overseer Rev. Nicholas Dobeng</p>
      </footer>
    </div>
  );
}

export default App;
