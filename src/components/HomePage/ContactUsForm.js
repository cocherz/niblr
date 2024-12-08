import React from "react";

const ContactUsForm = () => {
  return (
    <>
      <section className="contact-us-form">
        <div className="get-in-touch-content">
          <h2 className="hero-title">Get in touch</h2>
          <p className="hero-subtitle">Thinking of improving your customer experience? Learn what Niblr can do for you. Drop us a line.</p>
        </div>
        <form className="contact-form" name="contact" method="post">
          <input type="hidden" name="form-name" value="contact" />
          <div className="name-and-email">
            <p className="input">
              <label className="subheading" htmlFor="name">
                Name
              </label>{" "}
              <br />
              <input className="name-input" type="text" id="name" name="name" required />
            </p>
            <p className="input">
              <label className="subheading" htmlFor="email">
                Email
              </label>{" "}
              <br />
              <input className="email-input" type="email" id="email" name="email" required />
            </p>
          </div>
          <p className="input">
            <label className="subheading" htmlFor="message">
              Message
            </label>{" "}
            <br />
            <textarea className="msg-input " id="message" name="message" required></textarea>
          </p>
          <p className="input">
            <input className="submit-button" type="submit" value="Submit message" />
          </p>
        </form>
      </section>
    </>
  );
};

export default ContactUsForm;
