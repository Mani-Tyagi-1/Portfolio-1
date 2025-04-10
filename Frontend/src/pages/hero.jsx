import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Profile from "../../public/Mani.jpeg";
import {
  Code,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateTranslate = (index) => {
    const speed = index * 0.03;
    const x = (mousePosition.x - window.innerWidth / 2) * speed;
    const y = (mousePosition.y - window.innerHeight / 2) * speed;
    return `translateX(${x}px) translateY(${y}px)`;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden"
      >
        {/* Moving background elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-30 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              height: `${150 + i * 40}px`,
              width: `${150 + i * 40}px`,
              left: `${i * 20 - 10}%`,
              top: `${i * 15 - 10}%`,
              transform: calculateTranslate(i + 1),
            }}
          />
        ))}

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="inline-block">
                <motion.span
                  className="inline-block py-1 px-3 bg-blue-600 text-sm font-medium rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Full-Stack Developer
                </motion.span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-bold leading-tight"
              >
                Hi, I'm <span className="text-blue-500">Mani Tyagi</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-300 max-w-lg"
              >
                I build intuitive and scalable web applications with the MERN
                stack, focusing on creating exceptional user experiences.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  onClick={() => {
                    const element = document.getElementById("projects");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  View Projects <ArrowRight size={16} />
                </motion.button>

                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  Download Resume <ExternalLink size={16} />
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-4 pt-4"
              >
                <motion.a
                  href="https://github.com/Mani-Tyagi-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Github size={20} />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/mani-tyagi-958415232z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Linkedin size={20} />
                </motion.a>

                <motion.a
                  href="mailto:manityagi1919@gmail.com"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Mail size={20} />
                </motion.a>

                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Code size={20} />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-6 translate-y-6"></div>
                <motion.div
                  className="bg-gradient-to-br from-blue-600 to-violet-600 absolute -inset-1 rounded-full opacity-70"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                ></motion.div>
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 2 }}
                  className="relative bg-gray-900 rounded-full overflow-hidden border-4 border-gray-800 h-full w-full"
                >
                  <img
                    src={Profile}
                    alt="Your Profile"
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -top-6 -right-6 bg-white text-gray-900 py-1 px-3 rounded-lg font-medium text-sm shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  React.js
                </motion.div>

                <motion.div
                  className="absolute bottom-4 -left-10 bg-white text-gray-900 py-1 px-3 rounded-lg font-medium text-sm shadow-lg"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  MongoDB
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 right-10 bg-white text-gray-900 py-1 px-3 rounded-lg font-medium text-sm shadow-lg"
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  Node.js
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <motion.div
            className="w-1 h-10 bg-gradient-to-b from-blue-500 to-transparent rounded-full"
            animate={{
              y: [0, 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </section>

     
    </>
  );
};

export default Hero;
