import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SkillsSection = () => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const skillCards = [
    {
      title: "Development",
      skills: [
        "React",
        "Redux",
        "Tailwind",
        "HTML",
        "CSS",
        "JS",
        "Bootstrap",
        "Material UI",
        "Next.js",
      ],
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
      textColor: "text-blue-700",
      hoverColor: "bg-blue-600",
      icon: "💻",
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "MongoDB", "Mongoose"],
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
      textColor: "text-purple-700",
      hoverColor: "bg-purple-600",
      icon: "⚙️",
    },
    {
      title: "Tools & DevOps",
      skills: ["Git", "GitHub", "Thunder Client", "Netlify", "Vercel"],
      color: "bg-green-500",
      lightColor: "bg-green-100",
      textColor: "text-green-700",
      hoverColor: "bg-green-600",
      icon: "🔧",
    },
    {
      title: "Languages",
      skills: ["C", "C++", "Java"],
      color: "bg-yellow-500",
      lightColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      hoverColor: "bg-yellow-600",
      icon: "🗄️",
    },
  ];

  // Background animation particles
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-900 text-white  px-4 pt-16"
    >
      {/* Animated background particles */}
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 1,
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

      {/* Glowing circle behind title */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-blue-500 filter blur-3xl opacity-100"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl pb-2 md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text  "
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-blue-500 mx-auto mb-8 "
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
            Specialized in creating modern web applications with cutting-edge
            technologies
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 group "
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 relative overflow-hidden group"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Background glow effect */}
              <motion.div
                className={`absolute top-0 left-0 w-full h-full ${card.color} opacity-0 group-hover:opacity-10 rounded-lg`}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Card content */}
              <div className="relative z-10">
                <motion.div
                  className={`w-14 h-14 ${card.color} rounded-full flex items-center justify-center text-2xl mb-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>

                {/* Skill chips with hover animations */}
                <div className="flex flex-wrap gap-2">
                  {card.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${card.lightColor} ${card.textColor} border border-transparent transition-all duration-300 hover:cursor-pointer `}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: card.color,
                        color: card.textColor,
                        rotate: -5,
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Corner effect */}
              <motion.div
                className={`absolute top-0 right-0 w-8 h-8 ${card.color} opacity-30`}
                whileHover={{ scale: 3, opacity: 0.1, borderRadius: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById("projects");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            View My Projects
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="h-2  w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-10"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.5 }}
        transition={{ duration: 1.2 }}
      />
    </section>
  );
};

export default SkillsSection;
