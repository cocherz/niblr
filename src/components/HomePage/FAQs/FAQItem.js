import React, { useState } from "react";
import { ReactComponent as Plus } from "./Plus.svg";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="faq-item">
      <h2 className="faq-question subheading" onClick={toggle}>
        {question}
        <Plus className={`faq-icon ${isOpen ? "open" : ""}`} />
      </h2>
      <div className={`faq-answer hero-subtitle ${isOpen ? "open" : "faq-closed"}`}>{answer}</div>
    </div>
  );
};

export default FAQItem;
