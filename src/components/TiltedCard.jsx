import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import CircularText from "./CircularText";
import { LuSend } from "react-icons/lu";
import { WiStars } from "react-icons/wi";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      {/* Wrapper Motion Div: Chịu trách nhiệm xoay 3D */}
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* 1. HÌNH ẢNH */}
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-[35px] will-change-transform [transform:translateZ(0)]"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {/* 2. LỚP PHỦ ĐEN (OVERLAY) */}
        {/* z-[2] để nằm trên ảnh. bg-black/45 tạo độ tối */}
        <div
          className="absolute rounded-[35px] inset-0 bg-black/35 z-[2] pointer-events-none"
          style={{
            transform: "translateZ(1px)",
          }}
        />

        {/* 3. NỘI DUNG OVERLAY (TÊN, CHỨC DANH...) */}
        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[3] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}

        {/* 4. CIRCULAR TEXT (Nút Contact xoay xoay) */}
        {/* Đặt trong này để nó nghiêng theo thẻ. Dùng z-[4] để cao nhất */}
        <a
          href="#contact"
          // 1. Thêm class 'group' vào đây để báo hiệu cho con biết khi nào cha được hover
          className="absolute -bottom-5 -right-4 z-[10] scale-50 origin-bottom-right flex items-center justify-center cursor-pointer group"
          style={{ transform: "translateZ(70px)" }}
        >
          <CircularText
            text="HERE ✨ CONTACT ✨ ME ✨ "
            onHover="speedUp"
            spinDuration={20}
            className="text-white font-bold text-3xl tracking-widest bg-black/50 rounded-full backdrop-blur-md shadow-lg border border-white/10"
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* 2. Thêm transition và group-hover:scale-125 (phóng to 125%) */}
            <LuSend
              size={60}
              className="text-white transition-transform-colors duration-800 group-hover:scale-125 group-hover:text-yellow-600 "
            />
          </div>
        </a>
      </motion.div>

      {/* Tooltip khi hover chuột (nếu dùng) */}
      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
