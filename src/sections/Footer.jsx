import { motion } from "framer-motion";
import { mySocials } from "../constants";

const Footer = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 0.2 }}
      className="flex flex-wrap items-center justify-between gap-5 pb-8 pt-4 text-sm text-neutral-400 c-space"
    >
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      <div className="flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
      <div className="flex gap-3">
        {mySocials.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            whileHover={{ y: -5 }} // Icon nhảy nhẹ lên khi hover
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={social.icon} className="w-5 h-5" alt={social.name} />
          </motion.a>
        ))}
      </div>
      <p>© 2025 NGUYEN HAO QUANG.</p>
    </motion.section>
  );
};

export default Footer;
