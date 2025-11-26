import { motion } from "framer-motion";
import MagicBento from "../components/MagicBento";
import { Particles } from "../components/Particles";

const About = () => {
  // Variants cho tiêu đề: Rơi từ trên xuống, nảy nhẹ
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Variants cho khối Bento: Phóng to từ nhỏ, xoay 3D nhẹ, nảy mạnh
  const bentoContainerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotateX: 40, // Nghiêng 3D
      y: 100, // Chìm xuống dưới
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12, // Damping thấp -> Độ nảy cao (Bouncy)
        mass: 0.8,
        delay: 0.2, // Chờ tiêu đề hiện xong mới bung ra
      },
    },
  };

  return (
    <section
      className="c-space section-spacing flex flex-col justify-center items-center overflow-hidden"
      id="about"
      style={{ perspective: "1000px" }} // Quan trọng để tạo hiệu ứng 3D chiều sâu
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }} // Đợi hiện 50% mới chạy
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Hiệu ứng lướt cực mượt
        className="w-full flex justify-center"
      >
        <h2 className="text-heading w-[90%] text-center mb-8">About Me</h2>
      </motion.div>

      <motion.div
        variants={bentoContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full flex justify-center"
      >
        <MagicBento
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </motion.div>
      <Particles
        className="absolute top-0 left-0 right-0 bottom-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
    </section>
  );
};

export default About;
