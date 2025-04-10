import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_5u830qq";
    const templateId = "template_eqnlrdg";
    const publicKey = "jKwY6BRVErUeeykrB";

    const form = e.target;

    emailjs
      .sendForm(serviceId, templateId, form, publicKey)
      .then(() => {
        setIsFormSubmitted(true);
        setTimeout(() => setIsFormSubmitted(false), 3000);
        form.reset(); // Optional: Reset the form after success
      })
      .catch((error) => {
        console.error("Error:", error.text);
        alert("Something went wrong. Please try again!");
      });
  };

  // Background animations
  const bubbles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white overflow-hidden"
    >
      {/* Animated background elements */}
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-10 bg-white"
          initial={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: Math.random() * 0.5 + 0.5,
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: `${(index + 2) * 5}vw`,
            height: `${(index + 2) * 5}vw`,
            left: `${(index * 10) % 80}%`,
            top: `${(index * 15) % 80}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Let's Connect
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-blue-500 mx-auto mb-8 "
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p
            className="text-xl text-indigo-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Ready to collaborate? Reach out and let's create something amazing
            together.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20"
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(79, 70, 229, 0.5)",
                  "0px 0px 30px rgba(79, 70, 229, 0.8)",
                  "0px 0px 0px rgba(79, 70, 229, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <form
              onSubmit={handleSubmit}
              className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl border border-indigo-500/30 relative"
            >
              {isFormSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-indigo-200">
                    I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-indigo-300 text-sm font-medium block mb-2"
                      >
                        Your Name
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="text"
                        id="name"
                        name="user_name"
                        required
                        className="w-full bg-slate-900/50 border border-indigo-500/30 rounded-lg px-4 py-3 text-white placeholder-indigo-300/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Name.."
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-indigo-300 text-sm font-medium block mb-2"
                      >
                        Your Email
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="email"
                        id="email"
                        name="user_email"
                        required
                        className="w-full bg-slate-900/50 border border-indigo-500/30 rounded-lg px-4 py-3 text-white placeholder-indigo-300/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Email.."
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="text-indigo-300 text-sm font-medium block mb-2"
                      >
                        Your Message
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        id="message"
                        name="message"
                        rows="5"
                        required
                        className="w-full bg-slate-900/50 border border-indigo-500/30 rounded-lg px-4 py-3 text-white placeholder-indigo-300/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="I'd like to discuss a potential project..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-600/20"
                    >
                      Send Message
                    </motion.button>
                  </div>
                </>
              )}
            </form>
          </motion.div>

          {/* Social Links Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-indigo-300">
                Connect With Me
              </h3>
              <p className="text-indigo-200">
                Feel free to reach out through social media or schedule a
                meeting.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Mani-Tyagi-1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-slate-800/50 backdrop-blur-md border border-indigo-500/30 p-4 rounded-xl hover:bg-slate-700/50 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/mani-tyagi-958415232z/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-slate-800/50 backdrop-blur-md border border-indigo-500/30 p-4 rounded-xl hover:bg-slate-700/50 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span>LinkedIn</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:manityagi1919@gmail.com"
                className="flex items-center justify-center space-x-2 bg-slate-800/50 backdrop-blur-md border border-indigo-500/30 p-4 rounded-xl hover:bg-slate-700/50 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Email</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Mani-Tyagi-1"
                target="_blank"
                className="flex items-center justify-center space-x-2 bg-slate-800/50 backdrop-blur-md border border-indigo-500/30 p-4 rounded-xl hover:bg-slate-700/50 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                <span>Twitter</span>
              </motion.a>
            </div>

            {/* <motion.div
              className="bg-slate-800/50 backdrop-blur-md border border-indigo-500/30 p-6 rounded-xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="font-bold text-xl mb-3 text-indigo-300">
                Schedule a Meeting
              </h4>
              <p className="text-indigo-200 mb-4">
                Want to discuss your project in detail? Book a time that works
                for you.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Book a Call
              </motion.a>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
