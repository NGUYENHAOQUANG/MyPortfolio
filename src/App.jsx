import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Tech from "./sections/Tech";
import ScreenLoading from "./components/ScreenLoading"; // Đừng quên import cái này
import { useEffect, useState } from "react";
import Navbar from "./sections/navbar";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Giả lập thời gian load trang (hoặc đợi tài nguyên load xong)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // 6 giây

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        // =============================
        // 1. MÀN HÌNH LOADING
        // =============================
        <div className="w-screen h-screen overflow-hidden">
          <ScreenLoading />
        </div>
      ) : (
        <>
          <Navbar />

          {/* KHỐI 1: Các section cần căn giữa giới hạn (Hero, About, Projects) */}
          <div className="container mx-auto max-w-7xl overflow-x-hidden">
            <Hero />
          </div>

          <div className="w-full overflow-hidden">
            <About />
          </div>

          <div className="container mx-auto max-w-7xl overflow-x-hidden">
            <Projects />
          </div>

          {/* KHỐI 2: TECH (Tràn viền màn hình) */}
          {/* Nằm ngoài container để background full width */}
          <div className="w-full overflow-hidden">
            <Tech />
          </div>

          {/* KHỐI 3: EXPERIENCES (Quay lại căn giữa) */}
          <div className="container mx-auto max-w-7xl overflow-x-hidden">
            <Experiences />
            {/* <Testimonial /> */}
          </div>

          {/* KHỐI 4: CONTACT (Tràn viền màn hình) */}
          <div className="w-full overflow-hidden">
            <Contact />
          </div>

          {/* KHỐI 5: FOOTER (Căn giữa) */}
          <div className="container mx-auto max-w-7xl overflow-x-hidden">
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default App;
