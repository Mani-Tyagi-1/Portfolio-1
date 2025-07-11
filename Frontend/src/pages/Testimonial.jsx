import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, Acme Corp",
    message:
      "Mani is a top-tier developer. His dedication and skills brought our project to life seamlessly.",
    avatar: "/api/placeholder/80/80",
  },
  {
    name: "Jane Smith",
    role: "Project Manager, TechFlow",
    message:
      "Working with Mani was a pleasure. He communicates clearly and delivers high-quality work on time.",
    avatar: "/api/placeholder/80/80",
  },
  {
    name: "Michael Brown",
    role: "Marketing Director, Innovate Inc",
    message:
      "Exceptional problem-solving skills. Mani transformed our complex requirements into an elegant solution.",
    avatar: "/api/placeholder/80/80",
  },
  {
    name: "Sarah Johnson",
    role: "UX Designer, DesignHub",
    message:
      "Collaborating with Mani was effortless. His technical expertise and attention to detail are outstanding.",
    avatar: "/api/placeholder/80/80",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const getVisibleTestimonials = () => {
    // For desktop, show current and next testimonial (or loop back to first)
    const visibleItems = [
      testimonials[currentIndex],
      testimonials[(currentIndex + 1) % testimonials.length],
    ];
    return visibleItems;
  };

  return (
    <section className="bg-[#00040f] text-white py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent opacity-20"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            <span className="relative">
              What People Say
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
            </span>
          </h2>

          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-[#1f2937] hover:bg-indigo-900 transition border border-indigo-500/30"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="text-indigo-400" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-[#1f2937] hover:bg-indigo-900 transition border border-indigo-500/30"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Mobile carousel (single item) */}
        <div className="md:hidden">
          <div
            className={`transition-opacity duration-300 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            <TestimonialCard
              testimonial={testimonials[currentIndex]}
              highlighted={true}
            />
          </div>

          {/* Pagination dots for mobile */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-indigo-500 w-6" : "bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop carousel (two items) */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div
              key={`visible-${index}`}
              className={`transition-all duration-300 ${
                isAnimating
                  ? "opacity-0 translate-x-4"
                  : "opacity-100 translate-x-0"
              }`}
            >
              <TestimonialCard
                testimonial={testimonial}
                highlighted={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial card component
function TestimonialCard({ testimonial, highlighted }) {
  return (
    <div
      className={`bg-gradient-to-br ${
        highlighted
          ? "from-[#1f2937] to-[#111827] border-l-4 border-indigo-500"
          : "from-[#1f2937]/90 to-[#111827]/90"
      } p-8 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition relative h-full`}
    >
      <Quote
        size={36}
        className="text-indigo-500 opacity-70 mb-4 absolute -top-4 -left-1"
        strokeWidth={1}
      />

      <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
        "{testimonial.message}"
      </p>

      <div className="flex items-center">
        
        <div>
          <h4 className="text-white font-semibold">{testimonial.name}</h4>
          <p className="text-indigo-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
