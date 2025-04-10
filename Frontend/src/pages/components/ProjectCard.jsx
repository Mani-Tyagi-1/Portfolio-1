import React from "react";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const ProjectCard = ({
  title,
  description,
  techStack,
  liveLink,
  githubLink,
  image,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-all border border-gray-800"
    >
      <div className="h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        <p className="text-gray-500 text-sm italic">{techStack}</p>

        <div className="flex gap-4 pt-2">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <Github className="mr-1" size={18} />
              GitHub
            </a>
          )}

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ExternalLink className="mr-1" size={18} />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
