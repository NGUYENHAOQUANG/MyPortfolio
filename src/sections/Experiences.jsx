import { motion } from "framer-motion";
import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";

const Experiences = () => {
  return (
    // Thêm overflow-hidden và pb-20 để đảm bảo animation không kích hoạt scrollbar
    <section className="w-full overflow-hidden py-10" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 30 }} // Giảm biên độ y xuống 30 để ít bị lòi ra ngoài
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} // Chạy khi hiện 20%
        transition={{
          duration: 1, // Kéo dài 1 giây
          ease: [0.25, 0.1, 0.25, 1.0], // Mượt mà
        }}
        className="w-full h-full"
      >
        <Timeline data={experiences} />
      </motion.div>
    </section>
  );
};

export default Experiences;
