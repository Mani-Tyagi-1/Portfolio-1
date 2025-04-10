import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  GithubIcon,
  LinkedinIcon,
  CodeIcon,
  BookOpenIcon,
  LightbulbIcon,
  UsersIcon,
  TrendingUpIcon,
} from "lucide-react";

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const traits = [
    {
      icon: <LightbulbIcon />,
      text: "Problem Solver",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: <UsersIcon />,
      text: "Team Collaborator",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: <TrendingUpIcon />,
      text: "Always Learning",
      color: "from-green-400 to-emerald-500",
    },
  ];

  return (
    <div className="relative min-h-screen py-20  bg-white dark:bg-gray-900 overflow-hidden">
      <section
        id="about"
        ref={containerRef}
        className="relative min-h-screen py-20 flex items-center bg-white dark:bg-gray-900 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-10 blur-3xl"
              initial={{ x: i % 2 === 0 ? -100 : 100, y: i * 50 }}
              animate={{
                x: i % 2 === 0 ? window.innerWidth : -window.innerWidth,
                y: [i * 50, i * 50 + 100, i * 50],
              }}
              transition={{
                x: {
                  duration: 120 + i * 5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                },
                y: {
                  duration: 20 + i * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              style={{
                background: `radial-gradient(circle, 
                rgba(79, 70, 229, 0.${2 + i}) 0%, 
                rgba(16, 185, 129, 0.${1 + i}) 100%)`,
                height: `${200 + i * 50}px`,
                width: `${200 + i * 50}px`,
                top: `${i * 15}%`,
                left: `${i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              className="md:col-span-3 p-7"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-block mb-4">
                <span className="inline-block py-1 px-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium rounded-full text-sm">
                  About Me
                </span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white"
              >
                Bringing Your{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  Digital Vision
                </span>{" "}
                to Life
              </motion.h2>

              <motion.div
                variants={fadeInUp}
                className="prose prose-lg dark:prose-invert w-[45rem]"
              >
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I'm a passionate Full-Stack Developer with a strong focus on
                  building seamless, end-to-end digital solutions using the MERN
                  stack (MongoDB, Express.js, React.js, and Node.js).
                </p>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I thrive on turning complex challenges into clean, efficient,
                  and scalable code—bridging the gap between user experience and
                  robust backend functionality. With a deep understanding of
                  both frontend and backend technologies, I aim to craft
                  applications that are not only visually compelling but also
                  performant and secure.
                </p>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I'm driven by a constant desire to learn, improve, and create
                  impactful products that solve real-world problems. Let's build
                  something amazing together.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap gap-3"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg inline-flex items-center gap-2 transition-colors"
                >
                  <CodeIcon size={16} />
                  Work With Me
                </motion.a>

                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg inline-flex items-center gap-2 transition-colors"
                >
                  <BookOpenIcon size={16} />
                  View Projects
                </motion.a>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8 flex gap-4">
                <motion.a
                  href="https://github.com/Mani-Tyagi-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <GithubIcon size={20} />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/mani-tyagi-958415232z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <LinkedinIcon size={20} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Column - Strengths Cards */}
            <motion.div className="md:col-span-2 pr-4" style={{ y, opacity }}>
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {/* Floating cards */}
                <div className="space-y-6">
                  {traits.map((trait, index) => (
                    <motion.div
                      key={trait.text}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.8 + index * 0.2,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                      className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${trait.color} text-white`}
                        >
                          {trait.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                            {trait.text}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {trait.text === "Problem Solver" &&
                              "Breaking down complex challenges into elegant, efficient solutions."}
                            {trait.text === "Team Collaborator" &&
                              "Working effectively with designers, stakeholders, and other developers."}
                            {trait.text === "Always Learning" &&
                              "Continuously expanding my skills and embracing new technologies."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Background decorative elements */}
                <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-indigo-100/40  rounded-full blur-xl" />
                <div className="absolute -z-10 bottom-10 -left-10 w-24 h-24 bg-emerald-100/40  rounded-full blur-xl" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div
        className="h-2  w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.5 }}
        transition={{ duration: 1.2 }}
      />
    </div>
  );
};

export default About;
