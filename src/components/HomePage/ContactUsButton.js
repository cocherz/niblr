import React from "react";


const navToContactUs = () => {
  window.scrollTo({
    top: document.body.scrollHeight, // or document.documentElement.scrollHeight
    behavior: 'smooth' // Optional: this enables smooth scrolling
  });
}

export const ContactUsButton = ({copy}) => {
  return <button className="contact-us-button header-btn" onClick={navToContactUs}> {copy} </button>;
};

export default ContactUsButton;
