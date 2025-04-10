import React from 'react'

const resume = () => {
  return (
    <section id="resume">
      <h2>Resume</h2>
      <p>Here’s a quick look at my professional background.</p>
      <a href="/resume.pdf" target="_blank" className="btn">
        Download Resume
      </a>
      <iframe src="/resume.pdf" width="100%" height="600px"></iframe>
    </section>
  );
}

export default resume