import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sử dụng biến môi trường từ file .env
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Kiểm tra xem biến môi trường có được đọc đúng không
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS keys are missing in .env file");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "your message has been sent successfully!");
    } catch (error) {
      setIsLoading(false);
      console.error("Lỗi gửi mail:", error);
      showAlertMessage("danger", "Failed to send message. Please try again.");
    }
  };

  return (
    <section
      className="relative flex items-center c-space section-spacing"
      id="contact"
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      {/* Container chính với hiệu ứng xuất hiện */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary"
      >
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-heading"
          >
            Let's Talk
          </motion.h2>
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-normal text-neutral-400"
          >
            Whether you're looking to build a new website, improve your existing
            platform, or bring a unique project to life, I'm here to help
          </motion.p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          {/* Các input với hiệu ứng stagger nhẹ */}
          {[
            {
              id: "name",
              label: "Full Name",
              type: "text",
              placeholder: "Your Name",
            },
            {
              id: "email",
              label: "Email",
              type: "email",
              placeholder: "example@gmail.com",
            },
            {
              id: "message",
              label: "Message",
              type: "textarea",
              placeholder: "Share your thoughts...",
            },
          ].map((field, index) => (
            <motion.div
              key={field.id}
              className="mb-5"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            >
              <label htmlFor={field.id} className="feild-label">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  name={field.id}
                  rows="4"
                  className="field-input field-input-focus"
                  placeholder={field.placeholder}
                  autoComplete={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  className="field-input field-input-focus"
                  placeholder={field.placeholder}
                  autoComplete={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required
                />
              )}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Send" : "Sending..."}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
