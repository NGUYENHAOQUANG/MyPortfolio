import { motion } from "framer-motion";
import { Particles } from "../components/Particles";

// --- CẤU HÌNH DATA (Giữ nguyên) ---
const centerTech = {
  name: "React",
  src: "../assets/logos/react.svg",
  color: "#61DAFB",
};

const innerCircleTechs = [
  { name: "HTML5", src: "../assets/logos/html5.svg", color: "#E34F26" },
  { name: "CSS3", src: "../assets/logos/css3.svg", color: "#1572B6" },
  {
    name: "JavaScript",
    src: "../assets/logos/javascript.svg",
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    src: "../assets/logos/typescript.svg",
    color: "#3178C6",
  },
  { name: "Git", src: "../assets/logos/git.svg", color: "#F05032" },
];

const outerCircleTechs = [
  { name: "NextJS", src: "../assets/logos/nextjs.svg", color: "#FFFFFF" },
  {
    name: "Tailwind",
    src: "../assets/logos/tailwindcss.svg",
    color: "#38B2AC",
  },
  { name: "NodeJS", src: "../assets/logos/nodejs.svg", color: "#339933" },
  { name: "GitHub", src: "../assets/logos/github.svg", color: "#ffffff" },
  { name: "MongoDB", src: "../assets/logos/mongodb.svg", color: "#47A248" },
  { name: "Redux", src: "../assets/logos/redux.svg", color: "#764ABC" },
  { name: "Sass", src: "../assets/logos/sass.svg", color: "#CC6699" },
  { name: "Express", src: "../assets/logos/expressjs.svg", color: "#FFFFFF" },
];

// --- COMPONENT ICON ---
// Nhận thêm prop: entranceDelay (thời gian chờ để xuất hiện)
const TechIcon = ({
  tech,
  angle,
  radius,
  direction,
  duration,
  entranceDelay,
}) => {
  const x = radius * Math.cos((angle * Math.PI) / 180);
  const y = radius * Math.sin((angle * Math.PI) / 180);
  const rotateValue = direction === "clockwise" ? -360 : 360;

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{
        left: "50%",
        top: "50%",
        width: 80,
        height: 80,
        x,
        y,
        marginLeft: -40,
        marginTop: -40,
      }}
      // ANIMATION XUẤT HIỆN: Zoom-in từ 0 -> 1
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: entranceDelay, // Delay tùy thuộc vào thứ tự vòng
        type: "spring",
        stiffness: 200,
        damping: 12,
        mass: 0.8,
      }}
    >
      {/* LỚP 1: COUNTER-ROTATION (Xoay ngược để cân bằng) */}
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={{ rotate: rotateValue }}
        transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
      >
        {/* LỚP 2: HOVER INTERACTION */}
        <motion.div
          className="relative flex items-center justify-center w-full h-full rounded-full bg-neutral-900/90 border border-white/20 backdrop-blur-md cursor-pointer group"
          initial={{
            scale: 1,
            borderColor: "rgba(255,255,255,0.2)",
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          }}
          whileHover={{
            scale: 1.3,
            zIndex: 100,
            borderColor: tech.color,
            boxShadow: `0px 0px 40px ${tech.color}`,
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
            mass: 0.8,
          }}
        >
          <img
            src={tech.src}
            alt={tech.name}
            className="w-12 h-12 object-contain p-2"
          />
          {/* TOOLTIP */}
          <motion.div className="absolute -bottom-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[150]">
            <div
              className="relative px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-white/20 backdrop-blur-xl text-white text-xs font-bold tracking-wider shadow-xl whitespace-nowrap"
              style={{
                boxShadow: `0 4px 20px ${tech.color}50`,
                borderColor: tech.color,
              }}
            >
              {tech.name}
              <div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-t border-l border-white/20 rotate-45"
                style={{ borderColor: tech.color }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// --- COMPONENT VÒNG XOAY (Orbit Ring) ---
const OrbitRing = ({
  radius,
  duration,
  direction,
  techs,
  ringDelay,
  iconBaseDelay,
}) => {
  const dirMultiplier = direction === "clockwise" ? 1 : -1;
  const thickness = 1.5;
  const innerMaskPercent = ((radius - thickness) / radius) * 100;
  const galaxyColors = [
    "#0EA5E9",
    "#8B5CF6",
    "#D946EF",
    "#F43F5E",
    "#EAB308",
    "#10B981",
    "#0EA5E9",
  ];

  return (
    <div className="absolute flex items-center justify-center z-10">
      {/* 1. GALAXY GRADIENT RING: Zoom-in từ tâm */}
      <motion.div
        className="absolute rounded-full opacity-60"
        style={{
          width: radius * 2,
          height: radius * 2,
          background:
            "conic-gradient(from 0deg, #0EA5E9, #8B5CF6, #D946EF, #F43F5E, #EAB308, #10B981, #0EA5E9)",
          maskImage: `radial-gradient(closest-side, transparent ${innerMaskPercent}%, white ${innerMaskPercent}%)`,
          WebkitMaskImage: `radial-gradient(closest-side, transparent ${innerMaskPercent}%, white ${innerMaskPercent}%)`,
        }}
        // ANIMATION XUẤT HIỆN CỦA VÒNG TRÒN
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.6 }} // Opacity gốc là 0.6
        viewport={{ once: true }}
        transition={{
          delay: ringDelay,
          duration: 1.2,
          type: "spring",
          bounce: 0.4,
        }}
        // Animation xoay màu (Loop)
        animate={{ rotate: 360 }}
      ></motion.div>

      {/* Sửa lại cấu trúc để Animation Xuất hiện không xung đột với Animation Xoay */}
      <motion.div
        className="absolute flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: ringDelay,
          duration: 1,
          type: "spring",
          bounce: 0.4,
        }}
      >
        {/* Phần tử visual của vòng tròn (đã tách ra khỏi phần tử chứa icon) */}
        <motion.div
          className="absolute rounded-full opacity-60"
          style={{
            width: radius * 2,
            height: radius * 2,
            background:
              "conic-gradient(from 0deg, #0EA5E9, #8B5CF6, #D946EF, #F43F5E, #EAB308, #10B981, #0EA5E9)",
            maskImage: `radial-gradient(closest-side, transparent ${innerMaskPercent}%, white ${innerMaskPercent}%)`,
            WebkitMaskImage: `radial-gradient(closest-side, transparent ${innerMaskPercent}%, white ${innerMaskPercent}%)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute rounded-full border border-white/5"
          style={{
            width: radius * 2,
            height: radius * 2,
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.1)",
          }}
        />
      </motion.div>

      {/* 3. CONTAINER ICON: Xoay tròn */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 * dirMultiplier }}
        transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
      >
        {techs.map((tech, index) => (
          <TechIcon
            key={tech.name}
            tech={tech}
            angle={(360 / techs.length) * index}
            radius={radius}
            direction={direction}
            duration={duration}
            // Tính toán delay cho từng icon: Delay của vòng + (thứ tự icon * 0.1s)
            entranceDelay={iconBaseDelay + index * 0.1}
          />
        ))}
      </motion.div>
    </div>
  );
};

// --- COMPONENT LOGO TRUNG TÂM ---
// --- COMPONENT LOGO TRUNG TÂM ---
const CenterIcon = ({ tech }) => {
  return (
    <motion.div
      // Thêm class "group" để kích hoạt hover cho tooltip con
      className="absolute z-20 flex items-center justify-center w-36 h-36 rounded-full bg-black border border-white/20 shadow-2xl group cursor-pointer"
      style={{ boxShadow: `0 0 60px ${tech.color}40` }}
      // ANIMATION XUẤT HIỆN ĐẦU TIÊN
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{
        scale: 1.1,
        boxShadow: `0 0 100px ${tech.color}`,
        borderColor: tech.color,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src={tech.src}
        alt="Center Tech"
        className="w-20 h-20 object-contain"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* --- TOOLTIP REACT --- */}
      <motion.div className="absolute -bottom-14 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[150]">
        <div
          className="relative px-4 py-2 rounded-lg bg-neutral-900/90 border border-white/20 backdrop-blur-xl text-white text-sm font-bold tracking-wider shadow-xl whitespace-nowrap"
          style={{
            boxShadow: `0 4px 20px ${tech.color}50`,
            borderColor: tech.color,
          }}
        >
          {tech.name}
          {/* Mũi tên tooltip */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-t border-l border-white/20 rotate-45"
            style={{ borderColor: tech.color }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden c-space section-spacing py-20"
      id="tech"
    >
      <div className="z-10 text-center mb-20">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          What technologies do I use?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-neutral-400 text-sm md:text-base"
        >
          Building scalable applications with the modern stack
        </motion.p>
      </div>

      <div className="relative flex items-center justify-center w-full h-[900px] z-10 scale-[0.6] md:scale-100">
        {/* TIMELINE XUẤT HIỆN:
            1. React Logo: t=0
            2. Vòng Trong (Ring): t=0.4
            3. Icon Vòng Trong: t=0.6 -> t=1.0
            4. Vòng Ngoài (Ring): t=0.8
            5. Icon Vòng Ngoài: t=1.0 -> t=1.8
        */}

        {/* VÒNG NGOÀI */}
        <OrbitRing
          radius={360}
          duration={60}
          direction="counter-clockwise"
          techs={outerCircleTechs}
          ringDelay={0.8} // Vòng xuất hiện sau 0.8s
          iconBaseDelay={1.0} // Các icon bắt đầu xuất hiện từ 1.0s
        />

        {/* VÒNG TRONG */}
        <OrbitRing
          radius={210}
          duration={50}
          direction="clockwise"
          techs={innerCircleTechs}
          ringDelay={0.4} // Vòng xuất hiện sau 0.4s
          iconBaseDelay={0.6} // Các icon bắt đầu xuất hiện từ 0.6s
        />

        {/* LOGO TRUNG TÂM */}
        <CenterIcon tech={centerTech} />
      </div>

      <Particles
        className="absolute inset-0 -z-50 pointer-events-none"
        quantity={120}
        ease={80}
        color={"#ffffff"}
        refresh
      />
    </section>
  );
};

export default Tech;
