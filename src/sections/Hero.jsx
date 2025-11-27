import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import ParallaxBackground from "../components/parallaxBackground";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, useMemo } from "react";
import Loader from "../components/Loader";
import { motion } from "motion/react";
import TiltedCard from "../components/TiltedCard";

// --- CẤU HÌNH DANH SÁCH ICON (GIỮ NGUYÊN) ---
const techIcons = [
  {
    name: "React",
    src: "../assets/logos/react.svg",
    position: "top-[50%] left-[82%] md:top-[48%] md:left-[75%]",
    size: "w-16 h-16 md:w-16 md:h-16",
    color: "#12F3FF",
  },
  {
    name: "NextJS",
    src: "../assets/logos/nextjs.svg",
    position: "top-[45%] left-[58%] md:top-[42%] md:left-[55%]",
    size: "w-14 h-14 md:w-14 md:h-14",
    color: "#FFFFFF",
  },
  {
    name: "JavaScript",
    src: "../assets/logos/javascript.svg",
    position: "top-[15%] left-[80%] md:top-[20%] md:left-[78%]",
    size: "w-12 h-12 md:w-12 md:h-12",
    color: "#FFF53D",
  },
  {
    name: "TypeScript",
    src: "../assets/logos/typescript.svg",
    position: "top-[75%] left-[78%] md:top-[80%] md:left-[75%]",
    size: "w-12 h-12 md:w-11 md:h-11",
    color: "#16CFFF",
  },
  {
    name: "Tailwind",
    src: "../assets/logos/tailwindcss.svg",
    position: "top-[25%] left-[80%] md:top-[28%] md:left-[62%]",
    size: "w-12 h-12 md:w-12 md:h-12",
    color: "#5FFFD7",
  },
  {
    name: "NodeJS",
    src: "../assets/logos/nodejs.svg",
    position: "top-[65%] left-[62%] md:top-[60%] md:left-[58%]",
    size: "w-12 h-12 md:w-10 md:h-10",
    color: "#66FF66",
  },
  {
    name: "MongoDB",
    src: "../assets/logos/mongodb.svg",
    position: "top-[85%] left-[65%] md:top-[80%] md:left-[65%]",
    size: "w-10 h-10 md:w-9 md:h-9",
    color: "#7DFF7A",
  },
  {
    name: "HTML5",
    src: "../assets/logos/html5.svg",
    position: "top-[38%] left-[90%] md:top-[32%] md:left-[85%]",
    size: "w-10 h-10 md:w-8 md:h-8",
    color: "#FF6A2E",
  },
  {
    name: "CSS3",
    src: "../assets/logos/css3.svg",
    position: "top-[58%] left-[75%] md:top-[55%] md:left-[68%]",
    size: "w-10 h-10 md:w-8 md:h-8",
    color: "#5FA0FF",
  },
  {
    name: "MySQL",
    src: "../assets/logos/mysql.svg",
    position: "top-[58%] left-[90%] md:top-[15%] md:left-[65%]",
    size: "w-13 h-13 md:w-16 md:h-16",
    color: "#00758F",
  },
  {
    name: "Redux",
    src: "../assets/logos/redux.svg",
    position: "top-[80%] left-[85%] md:top-[75%] md:left-[82%]",
    size: "w-10 h-10 md:w-9 md:h-9",
    color: "#EE77FF",
  },
  {
    name: "Sass",
    src: "../assets/logos/sass.svg",
    position: "top-[35%] left-[55%] md:top-[35%] md:left-[52%]",
    size: "w-9 h-9 md:w-12 md:h-12",
    color: "#FF4DFF",
  },
  {
    name: "Express",
    src: "../assets/logos/expressjs.svg",
    position: "top-[34%] left-[80%] md:top-[18%] md:left-[58%]",
    size: "w-10 h-10 md:w-9 md:h-9",
    color: "#FDFDFD",
  },
];

// --- COMPONENT XỬ LÝ CHUYỂN ĐỘNG (ĐÃ TINH CHỈNH ĐỘ NẢY) ---
const FloatingIcon = ({ tech }) => {
  // 1. Random thông số Floating (Lơ lửng)
  const floatConfig = useMemo(() => {
    return {
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
      y: 10 + Math.random() * 10,
      rotate: 10 + Math.random() * 10,
    };
  }, []);

  // 2. Random thời gian xuất hiện (Entrance)
  const entranceDelay = useMemo(() => 2.5 + Math.random() * 1.5, []);

  return (
    <div
      className={`absolute ${tech.position} pointer-events-auto`}
      style={{ perspective: "500px" }}
    >
      {/* Wrapper Motion Div: Chịu trách nhiệm Scale-in kiểu "Pop-up" */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: entranceDelay,
          type: "spring",
          // --- CẤU HÌNH QUAN TRỌNG ĐỂ TẠO HIỆU ỨNG NẢY ---
          stiffness: 400, // Lực lò xo rất mạnh (kéo nhanh)
          damping: 10, // Lực cản rất thấp (để nó văng lố qua scale 1)
          mass: 0.8, // Nhẹ (để di chuyển nhanh)
          // Kết quả: Scale sẽ đi từ 0 -> 1.3 -> 0.9 -> 1.05 -> 1.0 (Rung rinh)
        }}
      >
        {/* Inner Motion Img: Chịu trách nhiệm Floating (Lơ lửng) mãi mãi */}
        <motion.img
          src={tech.src}
          alt={`${tech.name} floating icon`}
          className={`${tech.size} object-contain cursor-pointer`}
          style={{
            filter: `drop-shadow(0px 0px 20px ${tech.color})`,
          }}
          // Animation lơ lửng
          animate={{
            y: [-floatConfig.y, floatConfig.y],
            rotateX: [0, floatConfig.rotate, 0, -floatConfig.rotate, 0],
            rotateY: [0, -floatConfig.rotate, 0, floatConfig.rotate, 0],
            rotateZ: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: floatConfig.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: floatConfig.delay,
          }}
          // Hiệu ứng Hover
          whileHover={{
            scale: 1.2,
            filter: `drop-shadow(0 0 3px ${tech.color})`,
            transition: { type: "spring", stiffness: 300, damping: 10 },
          }}
        />
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 870 });

  return (
    <section
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
      id="home"
    >
      <HeroText />
      <ParallaxBackground />

      {/* 3D Scene Layer */}
      <figure
        className="absolute inset-0 z-10"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <Astronaut
                scale={isMobile ? 0.23 : 0.24}
                position={isMobile ? [0, -1.5, 0] : [2.5, -1, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>

      {/* Tech Icons Layer */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {techIcons.map((tech, index) => (
          <FloatingIcon key={index} tech={tech} />
        ))}
      </div>

      <motion.div
        className="absolute z-30 mt-20 md:top-70 2xl:left-80 md:left-30"
        initial={{
          opacity: 0,
          scale: 0,
          rotateX: -5,
          rotateY: 16,
          rotateZ: 5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateX: -5,
          rotateY: 16,
          rotateZ: 5,
        }}
        transition={{ delay: 2, type: "spring", stiffness: 400, damping: 20 }}
        style={{
          transformPerspective: 1500,
          filter: "drop-shadow(0px 0px 25px rgba(255, 255, 255, 0.4))",
        }}
      >
        {!isMobile && (
          <TiltedCard
            imageSrc="./assets/avatar.jpg"
            altText="avatar image"
            captionText="I'm a developer"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.01}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div className="p-1.5 bg-black/30 backdrop-blur-sm rounded rounded-2xl border-b border-r border-white/20 mt-4 ml-4">
                <div className=" bg-black/30 z-10">
                  <p className="text-white font-bold text-sm tracking-wide drop-shadow-md ">
                    Nguyễn Hào Quang
                  </p>
                </div>
              </div>
            }
          />
        )}
      </motion.div>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
