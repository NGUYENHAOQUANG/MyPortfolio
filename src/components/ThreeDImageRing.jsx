"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  easeOut,
  animate,
  useInView,
} from "framer-motion";
import { cn } from "../lib/utils";

export default function ThreeDImageRing({
  items,
  width = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  hoverOpacity = 0.5,
  containerClassName,
  ringClassName,
  imageClassName,
  backgroundColor,
  draggable = true,
  ease = "easeOut",
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.8,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
}) {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-200px" });

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef(0);
  const currentRotationY = useRef(initialRotation);
  const isDragging = useRef(false);
  const isPointerDown = useRef(false);
  const velocity = useRef(0);
  const hoverTimeoutRef = useRef(null);

  const [currentScale, setCurrentScale] = useState(1);
  const [showItems, setShowItems] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const angle = useMemo(() => 360 / items.length, [items.length]);

  const getBgPos = (itemIndex, currentRot, scale) => {
    const scaledImageDistance = imageDistance * scale;
    const effectiveRotation = currentRot - 180 - itemIndex * angle;
    const parallaxOffset = (((effectiveRotation % 360) + 360) % 360) / 360;
    return `${-(parallaxOffset * (scaledImageDistance / 1.5))}px 0px`;
  };

  // Logic update background position vẫn giữ nguyên, nhưng ta sẽ target vào thẻ con
  // Lưu ý: Do ta đổi cấu trúc DOM, cần querySelector sâu hơn 1 chút hoặc dùng ref array.
  // Tuy nhiên, cách đơn giản nhất ở đây là ta vẫn dùng cơ chế render props style trực tiếp như bên dưới
  // thay vì set tay style trong useEffect này để code gọn hơn và đỡ lỗi logic DOM.
  // Nhưng để giữ hiệu năng (performance), ta sẽ update style cho thẻ con thông qua ID hoặc class cụ thể.

  // Update logic effect: Tìm thẻ div con chứa background để update
  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((element, i) => {
          if (items[i].type === "image") {
            // SỬA: element là motion.div cha, ta cần tìm thẻ con có class 'img-bg-layer'
            const bgLayer = element.querySelector(".img-bg-layer");
            if (bgLayer) {
              bgLayer.style.backgroundPosition = getBgPos(
                i,
                latestRotation,
                currentScale
              );
            }
          }
        });
      }
      currentRotationY.current = latestRotation;
    });
    return () => unsubscribe();
  }, [rotationY, items, imageDistance, currentScale, angle]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const newScale =
        viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1;
      setCurrentScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowItems(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleDragStart = (event) => {
    if (!draggable) return;
    isPointerDown.current = true;
    isDragging.current = false;

    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;

    rotationY.stop();
    velocity.current = 0;

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event) => {
    if (!draggable || !isPointerDown.current) return;

    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX.current;

    if (!isDragging.current && Math.abs(deltaX) < 5) return;

    if (!isDragging.current) {
      isDragging.current = true;
      if (ringRef.current) {
        ringRef.current.style.cursor = "grabbing";
      }
      setActiveIndex(null);
    }

    velocity.current = -deltaX * 0.5;
    rotationY.set(currentRotationY.current + velocity.current);
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isPointerDown.current = false;

    if (!isDragging.current) {
      if (ringRef.current) ringRef.current.style.cursor = "grab";
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("touchend", handleDragEnd);
      return;
    }

    isDragging.current = false;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grab";
      currentRotationY.current = rotationY.get();
    }

    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const velocityBoost = velocity.current * inertiaVelocityMultiplier;

    animate(initial, initial + velocityBoost, {
      type: "inertia",
      velocity: velocityBoost,
      power: inertiaPower,
      timeConstant: inertiaTimeConstant,
      restDelta: 0.5,
      modifyTarget: (target) => Math.round(target / angle) * angle,
      onUpdate: (latest) => {
        rotationY.set(latest);
      },
    });
    velocity.current = 0;
  };

  const itemVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const opacityTransition = { duration: 0.5, ease: "easeInOut" };

  const handleHover = (index) => {
    if (isDragging.current || !ringRef.current) return;

    setActiveIndex(index);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Khi hover, ta animate opacity của thẻ cha (element)
    Array.from(ringRef.current.children).forEach((el, i) => {
      if (index === null) {
        animate(el, { opacity: 1 }, opacityTransition);
      } else {
        const targetOpacity = i === index ? 1 : hoverOpacity;
        animate(el, { opacity: targetOpacity }, opacityTransition);
      }
    });
  };

  const handleDoubleClick = (item) => {
    if (isDragging.current) return;
    if (item.link) {
      window.open(item.link, "_blank");
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden select-none relative",
        containerClassName
      )}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      <div
        className="pointer-events-none"
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${width * 0.6}px`,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ringRef}
          className={cn(
            "w-full h-full absolute pointer-events-none",
            ringClassName
          )}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
          }}
        >
          <AnimatePresence>
            {showItems &&
              items.map((item, index) => {
                const isVideo = item.type === "video";
                const cursorClass = item.link
                  ? "cursor-pointer" // Bỏ hover border ở đây, chuyển vào thẻ con
                  : "cursor-default";

                return (
                  <motion.div
                    key={index}
                    // SỬA ĐỔI QUAN TRỌNG:
                    // 1. Xóa overflow-hidden
                    // 2. Xóa bg-black, border (chuyển vào trong)
                    // 3. Giữ lại pointer-events-auto để bắt click
                    className={cn(
                      "w-full h-full absolute pointer-events-auto",
                      imageClassName,
                      cursorClass
                    )}
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      rotateY: index * -angle,
                      z: -imageDistance * currentScale,
                      transformOrigin: `50% 50% ${
                        imageDistance * currentScale
                      }px`,
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={itemVariants}
                    custom={index}
                    transition={{
                      delay: index * staggerDelay,
                      duration: animationDuration,
                      ease: easeOut,
                    }}
                    onDoubleClick={() => handleDoubleClick(item)}
                    onHoverStart={() => handleHover(index)}
                    onHoverEnd={() => {
                      hoverTimeoutRef.current = setTimeout(() => {
                        handleHover(null);
                      }, 100);
                    }}
                  >
                    {/* CONTAINER MỚI: Chứa nội dung ảnh/video và chịu trách nhiệm overflow-hidden */}
                    <div
                      className={cn(
                        "w-full h-full rounded-xl overflow-hidden bg-black border border-white/10 img-bg-layer transition-colors duration-300",
                        // Thêm hiệu ứng hover border vào đây
                        item.link ? "hover:border-blue-500/80" : ""
                      )}
                      style={{
                        ...(item.type === "image" && {
                          backgroundImage: `url(${item.src})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: getBgPos(
                            index,
                            currentRotationY.current,
                            currentScale
                          ),
                        }),
                      }}
                    >
                      {isVideo && (
                        <video
                          src={item.src}
                          className="w-full h-full object-cover pointer-events-none"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      )}
                    </div>

                    {/* TOOLTIP: Nằm ngang hàng với container ảnh => Không bị cắt */}
                    <AnimatePresence>
                      {activeIndex === index && item.link && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          // Đẩy z-index và translateZ để nó nổi hẳn lên trước
                          className="absolute -top-16 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "translateZ(50px)", // Đẩy tooltip ra trước 50px
                          }}
                        >
                          <div className="bg-neutral-900/90 backdrop-blur-md border border-white/20 text-white text-[12px] font-medium px-4 py-2 rounded-lg shadow-2xl whitespace-nowrap">
                            Double click to see detail
                          </div>
                          {/* Mũi tên */}
                          <div className="w-3 h-3 bg-neutral-900/90 border-r border-b border-white/20 absolute left-1/2 -bottom-1.5 -translate-x-1/2 rotate-45"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
