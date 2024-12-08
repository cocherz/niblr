import React from "react";

const Hero = (content) => {
  const tagline = content.content.hero_tagline[0].text;
  const title = content.content.hero_title[0].text;
  const video = content.content.hero_video.url 

  return (
    <section className="hero">
        <div className="hero-content">
            <h1 className="hero-title main-title">{title}</h1>
            <p className="hero-subtitle">{tagline}</p>
        </div>
        <div className="hero-video-container">
        <video className="hero-video" src={video} autoPlay muted loop playsInline></video>
        </div>
    </section>
  );
};

export default Hero;
