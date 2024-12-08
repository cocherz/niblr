import React from "react";
import FAQItem from "./FAQItem"; // Ensure this import path matches where your FAQItem component is saved

const FAQSection = ({ faqs, content }) => {
  return (
    <div className="faq-section">
      <h2 className="hero-title faq-title"> FAQs </h2>
      <section className="faq-container"> 
      {content.faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question[0].text} answer={faq.answer[0].text} />
      ))}
      </section>
    </div>
  );
};

export default FAQSection;
