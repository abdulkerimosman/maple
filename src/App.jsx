import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import TiktokGallery from './components/TiktokGallery';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <TiktokGallery />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}

export default App;