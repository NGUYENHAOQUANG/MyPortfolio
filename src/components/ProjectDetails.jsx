import { motion } from "motion/react";
import Carousel from "./Carousel"; // Đảm bảo bạn đã có file Carousel.jsx cùng thư mục

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  images,
  tags,
  href,
  closeModal,
}) => {
  // Logic: Nếu có mảng images thì dùng, không thì dùng mảng chứa 1 ảnh image
  const rawImages = images && images.length > 0 ? images : [image];

  // Map dữ liệu sang format cho Carousel
  const carouselItems = rawImages.map((imgUrl, index) => ({
    id: index,
    title: `Image ${index + 1}`,
    description: "Detailed View",
    image: imgUrl,
    tags: [],
  }));

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm bg-black/80 p-4">
      <motion.div
        className="relative w-full max-w-4xl border shadow-2xl rounded-2xl bg-[#0f172a] border-white/10 flex flex-col max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Nút đóng */}
        <button
          onClick={closeModal}
          className="absolute z-50 p-2 rounded-full top-4 right-4 bg-black/50 hover:bg-red-500/80 transition-colors cursor-pointer"
        >
          <img
            src="/assets/close.svg"
            // SỬA DÒNG NÀY:
            className="w-6 h-6 brightness-0 invert"
            alt="Close"
          />
        </button>

        {/* --- KHU VỰC CAROUSEL --- */}
        <div className="relative w-full h-[450px] bg-gradient-to-b from-[#111] to-[#0f172a] rounded-t-2xl overflow-hidden flex items-center justify-center border-b border-white/5">
          <div className="scale-90 origin-center w-full flex justify-center">
            <Carousel
              items={carouselItems}
              baseWidth={800}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        </div>

        {/* --- NỘI DUNG --- */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-[#0f172a]">
          <h5 className="mb-4 text-3xl font-bold text-white tracking-tight">
            {title}
          </h5>

          <p className="mb-6 text-base font-normal text-gray-300 leading-7">
            {description}
          </p>

          <div className="space-y-3 mb-8 bg-[#1e293b]/50 p-5 rounded-xl border border-white/5">
            {subDescription.map((subDesc, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-blue-500 mt-1.5 text-[10px]">●</span>
                <p className="font-normal text-gray-300 text-sm leading-6">
                  {subDesc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="relative group/tag"
                  title={tag.name}
                >
                  <img
                    src={tag.path}
                    alt={tag.name}
                    className="rounded-lg size-10 object-contain bg-[#1e293b] p-2 border border-white/10 hover:border-blue-500/50 transition-colors"
                  />
                </div>
              ))}
            </div>

            {/* Link */}
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-500/20"
              >
                View Project
                <img
                  src="/assets/arrow-up.svg"
                  alt="Arrow up"
                  className="size-4 rotate-45 invert"
                />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
