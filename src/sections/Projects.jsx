import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ThreeDImageRing from "../components/ThreeDImageRing";
import { Particles } from "../components/Particles";
// Đảm bảo đường dẫn import video là chính xác
import webcar from "../assets/carweb.mp4";
import musicweb from "../assets/musicweb.mp4";
import clockweb from "../assets/clockweb.mp4";
import meoweb from "../assets/meoweb.mp4";
import weatherweb from "../assets/weatherweb.mp4";
import todolistweb from "../assets/todolistweb.mp4";
import caculatorweb from "../assets/caculatorweb.mp4";
import ecomerceweb from "../assets/ecomerceweb.mp4";
import todoxweb from "../assets/todoxweb.mp4";
import { li } from "framer-motion/client";
const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      x.set(e.clientX + 20);
      y.set(e.clientY + 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const [preview, setPreview] = useState(null);

  // Mảng dữ liệu cho vòng xoay 3D
  const mediaItems = [
    {
      type: "video",
      src: meoweb,
      link: "https://nguyenhaoquang.github.io/meow/",
    },
    {
      type: "video",
      src: weatherweb,
      link: "https://nguyenhaoquang.github.io/weather/",
    },

    {
      type: "video",
      src: musicweb,
      link: "https://nguyenhaoquang.github.io/music/",
    },
    {
      type: "video",
      src: clockweb,
      link: "https://nguyenhaoquang.github.io/Clock/",
    },
    {
      type: "video",
      src: ecomerceweb,
      link: "https://marserille.onrender.com/",
    },
    {
      type: "video",
      src: webcar,
      link: "https://nguyenhaoquang.github.io/carweb/",
    }, // Video
    {
      type: "video",
      src: todoxweb,
    },
    {
      type: "video",
      src: todolistweb,
      link: "https://nguyenhaoquang.github.io/Todo-list/",
    },
    {
      type: "video",
      src: caculatorweb,
      link: "https://nguyenhaoquang.github.io/Caculator/",
    }, // Video
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative c-space section-spacing overflow-hidden"
      id="work"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-heading"
      >
        My Selected Projects
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
        className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full origin-left"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {myProjects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <Project {...project} setPreview={setPreview} />
          </motion.div>
        ))}
      </motion.div>

      {/* Preview Hover Image (dùng Portal để không bị cắt) */}
      {preview &&
        createPortal(
          <motion.img
            src={preview}
            alt="project preview"
            className="fixed top-0 left-0 z-[9999] object-cover h-64 w-96 rounded-2xl shadow-2xl pointer-events-none border-2 border-white/10 bg-[#0f172a]"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />,
          document.body
        )}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="relative w-full h-[600px] flex flex-col items-center justify-center py-10 bg-black/5 mt-20"
      >
        <div className="w-full text-center pt-10 text-heading pb-15 mb-10">
          All Projects
        </div>

        {/* --- CHỈNH SỬA Ở ĐÂY: Truyền kích thước to hơn cho khung hình ngang --- */}
        <ThreeDImageRing
          items={mediaItems}
          width={600} // Tăng chiều rộng để video to rõ
          imageDistance={850} // Tăng khoảng cách vòng tròn để các thẻ không đè nhau
        />
        {/* -------------------------------------------------------------------- */}

        <Particles
          className="absolute inset-0 -z-50"
          quantity={100}
          ease={80}
          color={"#ffffff"}
          refresh
        />
      </motion.section>
    </section>
  );
};

export default Projects;
