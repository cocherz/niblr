import React from "react";  
import { ReactComponent as Logo } from "./Niblr.svg"
import "./homepage.css"
import ContactUsButton from "./ContactUsButton";

export const Header = () => {

    return (
        <section className="header-content">
            <Logo className="niblr-logo-home"/>
            <ContactUsButton copy="Get in touch"/>
        </section>
    );
}

export default Header;