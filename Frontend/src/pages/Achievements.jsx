import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Improved Animated background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden -z-10 opacity-10">
    <div className="absolute inset-0">
      {Array.from({ length: 20 }).map((_, i) => {
        // More controlled random values
        const size = Math.random() * 150 + 50;
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        const xMove = Math.random() * 100 - 50;
        const yMove = Math.random() * 100 - 50;
        const duration = Math.random() * 10 + 15;

        return (
          <motion.div
            key={i}
            className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-50"
            style={{
              left: `${xPos}%`,
              top: `${yPos}%`,
              width: `${size}px`,
              height: `${size}px`,
            }}
            animate={{
              x: [0, xMove, 0],
              y: [0, yMove, 0],
              scale: [1, Math.random() * 0.5 + 1, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  </div>
);

// Helper function to safely extract nested data
const extractDataHelper = (data, path) => {
  try {
    if (!path || !data) return null;
    // Handle simple non-nested keys first
    if (!path.includes(".") && !path.includes("[")) {
      return data?.[path];
    }
    // Handle nested paths potentially including array indices
    return path.split(".").reduce((acc, part) => {
      if (!acc) return null; // Stop if intermediate object is null/undefined

      const arrayMatch = part.match(/(\w+)\[(\d+)\]/);
      if (arrayMatch) {
        const key = arrayMatch[1];
        const index = parseInt(arrayMatch[2], 10);
        return acc[key]?.[index];
      }
      return acc[part];
    }, data);
  } catch (e) {
    console.error(
      "Error extracting data with path:",
      path,
      "from data:",
      data,
      "Error:",
      e
    );
    return null;
  }
};

// Updated platforms with more detailed information
const platforms = [
  {
    name: "LeetCode",
    url: "https://leetcode-stats-api.herokuapp.com/Mani_Tyagi",
    icon: "/Leetcode.png",
    profile: "https://leetcode.com/Mani_Tyagi",
    color: "from-yellow-400 to-orange-500",
    description: "Data structures & algorithms challenges",
    keyMap: {
      questionsSolved: "totalSolved",
      rank: "ranking",
      // Leetcode API used here doesn't directly provide contest count easily
      // We can try 'totalContests' or similar if the API supports it, otherwise null/fallback
      contests: null, // Set to null if API doesn't provide it
    },
    manualStats: {
      // Fallback/Override data
      questionsSolved: 400, // Example: if API fails
      rank: "~200k", // Example: if API fails
      contests: 13, // Manual contest count
    },
  },
  {
    name: "GeeksforGeeks",
    // Note: The Vercel GFG API URL format might change or be specific. Check API docs.
    // Assuming the API returns an object with the specified keys directly.
    url: "https://gfg-stats-api.vercel.app/manityagi1919", // Corrected API endpoint structure
    icon: "/Gfg.jpg", // Ensure this path is correct
    profile: "https://auth.geeksforgeeks.org/user/manityagi1919",
    color: "from-green-400 to-green-600",
    description: "DSA, articles, and coding practice",
    keyMap: {
      questionsSolved: "totalProblemsSolved", // Key from typical GFG API responses
      rank: "overallCodingScore", // Using score as rank proxy
      contests: "monthlyCodingScore", // Example: Using another metric if contest count isn't direct
    },
    manualStats: {
      questionsSolved: 200, // Fallback/override
      rank: "10233", // Fallback/override
      contests: 3, // Fallback/override
    },
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/api/user.info?handles=manityagi1919",
    icon: "/Codeforces.png", // Ensure this path is correct
    profile: "https://codeforces.com/profile/manityagi1919",
    color: "from-blue-500 to-purple-600",
    description: "Competitive programming contests",
    keyMap: {
      questionsSolved: null, // CF API doesn't easily provide total solved problems
      rank: "result[0].rank", // Path to rank in CF API response
      contests: "",
    },
    manualStats: {
      questionsSolved: 250, // Manual value
      rank: "Pupil (1300+)", // Example description
      contests: 1, // Manual value
    },
  },
  {
    name: "HackerRank",
    url: null, // No API endpoint
    icon: "/Hackerrank.jpg", // Ensure this path is correct
    profile: "https://www.hackerrank.com/manityagi1919",
    color: "from-green-500 to-green-700",
    description: "Certifications and practice problems",
    keyMap: {
      // Keep keyMap structure even if URL is null for consistency
      questionsSolved: null,
      rank: null,
      contests: null,
    },
    manualStats: {
      // Purely manual data
      questionsSolved: 150,
      rank: "Gold Badge (Problem Solving)",
      contests: 1,
    },
  },
  {
    name: "Codechef",
    url: null, // No API endpoint
    icon: "/codechef.jpg", // Ensure this path is correct
    profile: "https://www.codechef.com/users/manityagi1919",
    color: "from-red-900 to-red-600/30",
    description: "Monthly contests and ratings",
    keyMap: {
      questionsSolved: null,
      rank: null,
      contests: null,
    },
    manualStats: {
      // Purely manual data
      questionsSolved: 74,
      rank: "1★ (1200+ Rating)",
      contests: 7,
    },
  },
];

// Add animated badge component
const AnimatedBadge = ({ text }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mr-2 mb-2"
  >
    {text}
  </motion.div>
);

const Achievements = () => {
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      const fetchedData = {};

      await Promise.all(
        platforms.map(async (platform) => {
          let platformResult = {
            questionsSolved: platform.manualStats?.questionsSolved ?? "-", // Start with manual defaults or '-'
            rank: platform.manualStats?.rank ?? "-",
            contests: platform.manualStats?.contests ?? "-",
            error: null,
          };

          if (platform.url) {
            // Attempt API fetch if URL exists
            try {
              const res = await fetch(platform.url);
              if (!res.ok) {
                // Don't throw immediately, try to use manual data but log error
                console.error(
                  `HTTP error! Status: ${res.status} for ${platform.name}`
                );
                platformResult.error = `API fetch failed (Status: ${res.status})`;
                // Keep manual stats already set
              } else {
                const apiData = await res.json();

                // Try extracting data based on keyMap, override defaults if successful
                for (const [label, keyPath] of Object.entries(
                  platform.keyMap
                )) {
                  if (keyPath) {
                    const value = extractDataHelper(apiData, keyPath);
                    if (value !== null && value !== undefined) {
                      // Only override if API provides a value
                      platformResult[label] = value;
                    }
                  }
                }
                // Clear error if fetch was successful
                platformResult.error = null;
              }
            } catch (err) {
              console.error(
                `Failed to fetch or process data for ${platform.name}:`,
                err
              );
              // Keep manual stats but add specific fetch error message
              platformResult.error = "Failed to fetch data";
            }
          }
          // Assign the final result (API data or manual fallback)
          fetchedData[platform.name] = platformResult;
        })
      );

      setStats(fetchedData);
      setIsLoading(false);
    };

    fetchStats();

    // No cleanup needed for this effect
    // return () => {};
  }, []); // Run only on mount

  const platformsByCategory = {
    all: platforms,
    competitive: platforms.filter(
      (p) => p.name === "Codeforces" || p.name === "Codechef"
    ),
    practice: platforms.filter(
      (p) =>
        p.name === "LeetCode" ||
        p.name === "GeeksforGeeks" ||
        p.name === "HackerRank"
    ),
  };

  // Get data for the selected platform safely
  const modalData = selectedPlatform ? stats[selectedPlatform.name] || {} : {};
  const modalQuestionsSolved = modalData.questionsSolved;
  const modalRank = modalData.rank;
  const modalContests = modalData.contests;
  const modalError = modalData.error;

  return (
    <section className="relative pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900 min-h-screen">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center mb-16">
          <motion.h1
            className="text-5xl pb-2 md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Coding Achievements
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-blue-500 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Track record of my programming journey across various platforms
          </motion.p>

          {/* Filter tabs */}
          <motion.div
            className="flex justify-center mt-8 space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {["all", "competitive", "practice"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <>
            {/* Selected platform details modal */}
            <AnimatePresence>
              {selectedPlatform && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm" // Added backdrop blur
                  onClick={() => setSelectedPlatform(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                  >
                    {/* Modal Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`p-2 rounded-full bg-gradient-to-r ${selectedPlatform.color} shadow-md`} // Reduced padding, added shadow
                      >
                        <img
                          src={selectedPlatform.icon}
                          alt={selectedPlatform.name}
                          className="w-12 h-12 rounded-full object-contain" // Ensure icon fits well
                        />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {selectedPlatform.name}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {selectedPlatform.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedPlatform(null)}
                        className="ml-auto text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Stats details */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                          Stats Overview
                        </h3>
                        <div className="space-y-3">
                          {modalError && ( // Display error prominently if exists
                            <p className="text-sm text-red-600 dark:text-red-400 p-2 bg-red-100 dark:bg-red-900/30 rounded-md">
                              {modalError}
                            </p>
                          )}
                          {/* Display stats only if they exist and are not '-' */}
                          {modalQuestionsSolved != null &&
                          modalQuestionsSolved !== "-" ? (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600 dark:text-gray-300">
                                Problems Solved
                              </span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {modalQuestionsSolved}
                              </span>
                            </div>
                          ) : (
                            !modalError && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Problems Solved: N/A
                              </div>
                            )
                          )}

                          {modalRank != null && modalRank !== "-" ? (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600 dark:text-gray-300">
                                Current Rank/Rating
                              </span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {modalRank}
                              </span>
                            </div>
                          ) : (
                            !modalError && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Rank/Rating: N/A
                              </div>
                            )
                          )}

                          {modalContests != null && modalContests !== "-" ? (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600 dark:text-gray-300">
                                Contests Participated
                              </span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {modalContests}
                              </span>
                            </div>
                          ) : (
                            !modalError && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Contests: N/A
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Additional info */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                          Skills Demonstrated
                        </h3>
                        <div className="flex flex-wrap">
                          <AnimatedBadge text="Data Structures" />
                          <AnimatedBadge text="Algorithms" />
                          <AnimatedBadge text="Problem Solving" />
                          {selectedPlatform.name === "Codeforces" ||
                          selectedPlatform.name === "Codechef" ? (
                            <>
                              <AnimatedBadge text="Competitive Programming" />
                              <AnimatedBadge text="Contest Strategy" />
                            </>
                          ) : (
                            <>
                              <AnimatedBadge text="Time Complexity" />
                              <AnimatedBadge text="Space Complexity" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <motion.a
                      href={selectedPlatform.profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-4 rounded-xl text-center text-white font-medium bg-gradient-to-r ${selectedPlatform.color} hover:shadow-lg transition-all duration-300 block`}
                    >
                      Visit My Profile on {selectedPlatform.name}
                    </motion.a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main grid of platform cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.07, // Slightly faster stagger
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {platformsByCategory[activeTab].map((platform) => {
                // Safely get the processed data from state
                const platformData = stats[platform.name] || {};
                const questionsSolved = platformData.questionsSolved;
                const rank = platformData.rank;
                const contests = platformData.contests;
                const error = platformData.error;

                return (
                  <motion.div
                    key={platform.name}
                    variants={{
                      hidden: { y: 30, opacity: 0 }, // Start slightly lower
                      show: { y: 0, opacity: 1 },
                    }}
                    transition={{ type: "spring", damping: 12, stiffness: 100 }} // Spring animation
                    whileHover={{
                      y: -8, // Slightly less lift
                      boxShadow:
                        "0 10px 20px -5px rgba(0, 0, 0, 0.15), 0 6px 6px -5px rgba(0, 0, 0, 0.1)", // Softer shadow
                    }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 cursor-pointer flex flex-col" // Added flex column
                    onClick={() => setSelectedPlatform(platform)} // Open modal on click
                  >
                    {/* Color bar */}
                    <div
                      className={`h-2 w-full bg-gradient-to-r ${platform.color}`}
                    ></div>
                    {/* Card Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {" "}
                      {/* Added flex grow */}
                      {/* Card Header */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative flex-shrink-0">
                          {" "}
                          {/* Ensure icon doesn't shrink */}
                          <div
                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${platform.color} blur opacity-60 -z-10`}
                          ></div>
                          <img
                            src={platform.icon}
                            alt={platform.name}
                            className="w-12 h-12 rounded-full relative z-10 object-contain bg-white dark:bg-gray-700 p-1" // Added padding and bg
                          />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {" "}
                          {/* Reduced font size */}
                          {platform.name}
                        </h2>
                      </div>
                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-5">
                        {" "}
                        {/* Reduced margin */}
                        {platform.description}
                      </p>
                      {/* Stats List */}
                      <div className="space-y-2 mb-5 text-sm flex-grow">
                        {" "}
                        {/* Reduced spacing & margin, added flex-grow */}
                        {/* Display stats only if they exist and are not '-' */}
                        {questionsSolved != null && questionsSolved !== "-" && (
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <svg
                              className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                            Problems Solved:{" "}
                            <span className="font-semibold ml-1">
                              {questionsSolved}
                            </span>
                          </div>
                        )}
                        {rank != null && rank !== "-" && (
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <svg
                              className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                            Rank/Rating:{" "}
                            <span className="font-semibold ml-1">{rank}</span>
                          </div>
                        )}
                        {contests != null && contests !== "-" && (
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <svg
                              className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            Contests:{" "}
                            <span className="font-semibold ml-1">
                              {contests}
                            </span>
                          </div>
                        )}
                        {/* Display error if present */}
                        {error && (
                          <p className="text-red-500 dark:text-red-400 flex items-center text-xs pt-1">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            {error}
                          </p>
                        )}
                        {/* Fallback message if no data and no error */}
                        {!(
                          questionsSolved != null && questionsSolved !== "-"
                        ) &&
                          !(rank != null && rank !== "-") &&
                          !(contests != null && contests !== "-") &&
                          !error && (
                            <p className="text-gray-400 dark:text-gray-500 text-xs pt-1">
                              Stats currently unavailable.
                            </p>
                          )}
                      </div>
                      {/* View Details Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`mt-auto w-full py-2 px-4 rounded-lg text-white text-sm font-medium bg-gradient-to-r ${platform.color} hover:shadow-md transition-all duration-300 text-center`} // Added mt-auto
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}

        {/* Summary achievements section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isLoading ? 0 : 0.5, duration: 0.7 }} // Adjust delay based on loading
          className="mt-20 text-center" // Increased margin top
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Coding Journey Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Example static highlights */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all"
            >
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {/* Calculate total solved dynamically? Or keep static */}
                1000+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Problems Solved (Across Platforms)
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all"
            >
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {/* Calculate total contests? Or keep static */}
                25+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Contests Participated
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all"
            >
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {platforms.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Active Platforms Tracked
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

       <motion.div
              className="h-2  w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-7"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 0.5 }}
              transition={{ duration: 1.2 }}
            />
    </section>
  );
};

export default Achievements;
