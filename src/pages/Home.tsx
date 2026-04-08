import Hero from '../sections/Hero';
import About from '../sections/About';
import Ministries from '../sections/Ministries';
import MediaHub from '../sections/MediaHub';
import Events from '../sections/Events';
import Connect from '../sections/Connect';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
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

      <Footer />
    </div>
  );
};

export default Home;
