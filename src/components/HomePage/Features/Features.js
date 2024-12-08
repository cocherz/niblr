import React from "react";



const FeatureCard = ({item}) => {


    return (
        <div className="feature-card">
            {/* <img src={item.img.url} alt="" className="feature-img" />
            <h3 className="feature-title">{item.title[0].text}</h3>
            <p className="feature-copy">{item.copy[0].text}</p> */}
        </div>
    );
}







const Features = ( content) => {

    return (
        <section className="features-section">
            <h2 className="hero-title">Features</h2>
            <div className="feature-cards">
                {content.content.features.map((item, index) => (
                    <FeatureCard key={index} item={item} />
                ))}
            </div>
        </section>
    );
    }

export default Features;
