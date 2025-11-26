import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails"; // Sửa lại đường dẫn import nếu cần (thường là ./ProjectDetails hoặc ../components/ProjectDetails)

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  images,
  tags = [], // 1. Thêm giá trị mặc định [] để tránh lỗi crash nếu tags bị thiếu
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  // --- 2. LOGIC QUAN TRỌNG ĐỂ SỬA LỖI HOVER ---
  // Ưu tiên dùng 'image'. Nếu không có, lấy hình đầu tiên của 'images'.
  const imageToPreview =
    image || (images && images.length > 0 ? images[0] : null);

  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        // 3. Sửa ở đây: Truyền biến đã tính toán vào setPreview
        onMouseEnter={() => setPreview(imageToPreview)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl font-bold text-white">{title}</p>
          <div className="flex gap-5 mt-2 text-sand">
            {/* 4. Thêm kiểm tra tags tồn tại trước khi map */}
            {tags &&
              tags.map((tag) => (
                <span key={tag.id} className="text-neutral-400 text-sm">
                  {tag.name}
                </span>
              ))}
          </div>
        </div>
        <button
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation text-white"
        >
          Read More
          <img
            src="assets/arrow-right.svg"
            className="w-5 invert"
            alt="arrow"
          />
        </button>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          images={images}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
