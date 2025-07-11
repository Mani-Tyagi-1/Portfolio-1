import Hero from "./pages/hero";
import About from "./pages/about";
import Skills from "./pages/skills";
import Projects from "./pages/projects";
import Blogs from "./pages/blogs";
import Contact from "./pages/contact";
import Footer from "./pages/footer";
import Navbar from "./pages/navbar";
import Achievements from "./pages/Achievements";
import Testimonials from "./pages/Testimonial";
function App() {
  
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      {/* <Blogs /> */}
      <Achievements />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </>
  )
}

export default App
