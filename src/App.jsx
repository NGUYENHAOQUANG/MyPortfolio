import Navbar from "./sections/navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ScreenLoading from "./components/ScreenLoading";
import { useEffect, useState } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  return (
    <>
      {isLoading ? (
        // =============================
        // LOADING SCREEN FULL MÀN HÌNH
        // =============================
        <div className="w-screen h-screen ">
          <ScreenLoading />
        </div>
      ) : (
        // =============================
        // NỘI DUNG CHÍNH
        // =============================
        <div className="container mx-auto max-w-7xl overflow-x-hidden">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Experiences />
          <Testimonial />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
