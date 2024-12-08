import React from "react";

export const DemoCards = (content) => {
  return (
    <section className="demo-section">
      <h2 className="hero-title">Example sites</h2>
      <p className="hero-subtitle"> Interested in seeing what your menu could look like with Niblr? </p>
      <div className="demo-cards">
        {content.content.demo.map((item, index) => (
          <Card key={index} img={item.img.url} heading={item.title[0].text} copy={item.copy[0].text} link={item.url.url} />
        ))}
      </div>
    </section>
  );
};

const Card = ({ img, heading, copy, link }) => {
  return (
    <section className="card">
        <img className="demo-img" src={img} alt="placeholder" />
        <h2 className="subheading center-text">{heading}</h2>
        <p className="copy center-text"> {copy}</p>
        <a href={link} className='demo-btn'>
          <button className="contact-us-button">Visit site</button>
        </a>
    </section>
  );
};

export default DemoCards;
