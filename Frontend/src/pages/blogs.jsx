import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Enhanced BlogPostCard component
const BlogPostCard = ({ title, date, snippet, link, index, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative overflow-hidden bg-gray-800 rounded-xl shadow-lg"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background pattern */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 opacity-90 z-0"
        animate={{
          opacity: isHovered ? 0.85 : 0.9,
          background: isHovered
            ? "linear-gradient(to bottom right, rgb(30, 41, 59), rgb(17, 24, 39), rgb(30, 41, 59))"
            : "linear-gradient(to bottom right, rgb(31, 41, 55), rgb(17, 24, 39), rgb(31, 41, 55))",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 bg-blue-500 opacity-10 rounded-bl-full z-0"
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.15 : 0.1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Image (if available) */}
      {image && (
        <div className="w-full h-40 overflow-hidden">
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
        </div>
      )}

      <div className="p-6 relative z-10">
        {/* Date badge */}
        <motion.div
          className="inline-block px-3 py-1 rounded-full bg-blue-600 text-xs font-medium text-white mb-4"
          animate={{
            y: isHovered ? -2 : 0,
            backgroundColor: isHovered ? "#3b82f6" : "#2563eb",
          }}
        >
          {date}
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-white mb-3"
          animate={{
            color: isHovered ? "#60a5fa" : "#ffffff",
          }}
        >
          {title}
        </motion.h3>

        {/* Snippet */}
        <motion.p
          className="text-gray-300 mb-4 line-clamp-2"
          animate={{ opacity: isHovered ? 1 : 0.9 }}
        >
          {snippet}
        </motion.p>

        {/* Read more link */}
        <motion.a
          href={link}
          className="inline-flex items-center text-blue-400 font-medium"
          whileHover={{ x: 5, color: "#60a5fa" }}
          animate={{ x: isHovered ? 3 : 0 }}
        >
          Read more
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.a>
      </div>

      {/* Bottom light bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-10"
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "30%" }}
        transition={{ duration: 0.5 }}
      />
    </motion.article>
  );
};

// Main Blog Section Component
const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Sample blog post data (you can replace with your own)
  const blogPosts = [
    {
      title: "Why I chose MERN stack for my projects",
      date: "Mar 2025",
      snippet:
        "Here's a quick breakdown of why the MERN stack became my go-to for web application development and how it streamlined my workflow.",
      link: "/blog/mern-stack-choice",
      image:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60",
      category: "Tech Stack",
    },
    {
      title: "5 React Patterns Every Junior Developer Should Know",
      date: "Feb 2025",
      snippet:
        "Level up your React skills with these essential patterns that will make your code more maintainable and easier to understand.",
      link: "/blog/react-patterns",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
      category: "React",
    },
    {
      title: "Creating Seamless User Experiences with CSS Animations",
      date: "Jan 2025",
      snippet:
        "Discover how subtle animations can dramatically improve user experience and engagement on your web applications.",
      link: "/blog/css-animations",
      image:
        "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=800&auto=format&fit=crop&q=60",
      category: "Design",
    },
  ];

  // Categories for filter
  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  // Filtered posts based on active category
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  // Background animation elements
  const generateRandomLines = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      opacity: Math.random() * 0.05 + 0.02,
      duration: Math.random() * 20 + 15,
    }));
  };

  const backgroundLines = generateRandomLines(10);

  return (
    <section
      id="blog"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gray-900 text-white py-16 px-4"
    >
      {/* Background animated lines */}
      <svg
        className="absolute inset-0 w-full h-full z-0 opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        {backgroundLines.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="#60a5fa"
            strokeWidth="1"
            opacity={line.opacity}
            animate={{
              x1: [`${line.x1}%`, `${line.x1 + 10}%`, `${line.x1}%`],
              y1: [`${line.y1}%`, `${line.y1 - 5}%`, `${line.y1}%`],
              x2: [`${line.x2}%`, `${line.x2 - 15}%`, `${line.x2}%`],
              y2: [`${line.y2}%`, `${line.y2 + 10}%`, `${line.y2}%`],
            }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating dots */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.2 + 0.1,
              scale: Math.random() * 0.4 + 0.1,
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 25 + Math.random() * 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: `${Math.random() * 10 + 3}px`,
              height: `${Math.random() * 10 + 3}px`,
            }}
          />
        ))}
      </div>

      {/* Central glowing orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500 opacity-5 filter blur-3xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            My Blog
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-blue-500 mx-auto mb-6"
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
            Thoughts, tutorials, and insights from my dev journey
          </motion.p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogPostCard key={index} {...post} index={index} />
          ))}
        </div>

        {/* View all posts button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles
          </motion.button>

          {/* Newsletter signup */}
          <motion.div
            className="mt-12 max-w-md mx-auto bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            whileHover={{
              y: -5,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 className="text-lg font-semibold mb-3">
              Subscribe to my newsletter
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Get the latest articles and resources sent straight to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <motion.button
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
                whileHover={{ backgroundColor: "#3b82f6" }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs;
