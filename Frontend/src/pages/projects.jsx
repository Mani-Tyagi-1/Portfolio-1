import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Dev from "/Dev.png";
import Imaginify from "../../public/Imaginify.png";
import EBharat from "/EBharat.png";

// Enhanced ProjectCard component
const ProjectCard = ({
  title,
  description,
  techStack,
  liveLink,
  githubLink,
  image,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Convert techStack string to array
  const technologies = techStack.split(", ");

  return (
    <motion.div
      className="relative group overflow-hidden rounded-xl bg-gray-800 shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Project Image with overlay */}
      <div className="relative h-56 md:h-64 w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 z-10"
          animate={{ opacity: isHovered ? 0.85 : 0.7 }}
        />

        <motion.div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Tech stack chips that appear on hover */}
        <motion.div
          className="absolute top-4 right-4 flex flex-wrap justify-end gap-2 z-20 max-w-[80%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {technologies.map((tech, idx) => (
            <motion.span
              key={idx}
              className="px-2 py-1 bg-blue-500 bg-opacity-90 text-xs font-medium text-white rounded-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="text-xl font-bold text-white mb-2"
          animate={{
            color: isHovered ? "#60a5fa" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        <motion.p className="text-gray-300 mb-4 line-clamp-2">
          {description}
        </motion.p>

        {/* Links - slide in from bottom on hover */}
        <motion.div
          className="flex space-x-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 10,
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.a
            href={liveLink}
            target="_blank"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </motion.a>

          <motion.a
            href={githubLink}
            target="_blank"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-700 text-white font-medium text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Corner accent */}
      <motion.div
        className="absolute top-0 left-0 w-20 h-20 bg-blue-500 opacity-0"
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        style={{
          clipPath: "polygon(0 0, 0% 100%, 100% 0)",
        }}
      />
    </motion.div>
  );
};

// Main Projects Section Component
const Projects = () => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Sample project data (you can replace with your own)
  const projectsData = [
    {
      title: "Imaginify",
      description:
        "An AI image generation and management app with advanced features for content creators.",
      techStack: "React, Tailwind, Node.js, MongoDB, Cloudinary",
      liveLink: "https://imaginify-chi-two.vercel.app/",
      githubLink: "https://github.com/Mani-Tyagi-1/Imaginify",
      image:
        Imaginify,
    },
    {
      title: "E-Bharat",
      description:
        "A comprehensive e-commerce platform with user-friendly features and a modern design with theme switcher.",
      techStack: "React, Tailwind, Firebasr, Firebase Auth ",
      liveLink: "https://e-commerce-eight-ruddy.vercel.app/",
      githubLink: "https://github.com/Mani-Tyagi-1/ECommerce",
      image:
        EBharat,
    },
    {
      title: "Dev Detective",
      description:
        "A social media application inspired by Threads with real-time updates and notifications.",
      techStack: "HTML, CSS, JS, APIs",
      liveLink: "devdetective11.netlify.app",
      githubLink: "https://github.com/Mani-Tyagi-1/DevDetective",
      image:
        Dev,
    },
  ];

  // Background animation particles
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-900 text-white py-16 px-4"
    >
      {/* Animated background particles */}
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500 opacity-10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
          }}
          transition={{
            duration: 15 + Math.random() * 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
          }}
        />
      ))}

      {/* Animated grid background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, #60a5fa 1px, transparent 1px),
            linear-gradient(to bottom, #60a5fa 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        >
          <motion.div
            className="w-full h-full bg-blue-500 opacity-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl pb-2 md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-blue-500 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Explore my latest work and creative solutions
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.a
            href="https://github.com/Mani-Tyagi-1"
            target="_blank"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.a>

          {/* <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-10 border-2 border-white rounded-full opacity-50 mt-8"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-1 h-1 bg-white rounded-full mx-auto mt-2"
              animate={{
                opacity: [0, 1, 0],
                y: [0, 10, 20],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div> */}

          
        </motion.div>
      </div>


       <motion.div
              className="h-2  w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-7"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 0.5 }}
              transition={{ duration: 1.2 }}
            />
    </section>
  );
};

export default Projects;
