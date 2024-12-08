import React from "react";
import Header from "./components/HomePage/Header";
import Hero from "./components/HomePage/Hero";
import ContactUsForm from "./components/HomePage/ContactUsForm";
import FAQSection from "./components/HomePage/FAQs/FAQSection";
import USPSection from "./components/HomePage/USPs/UPSSection";
import ContactUsButton from "./components/HomePage/ContactUsButton";
import { client } from "./prismic";
import { useSinglePrismicDocument } from "@prismicio/react";
import { PrismicProvider } from "@prismicio/react";
import DemoCards from "./components/HomePage/DemoCards";


export const Homepage = ({currentConfig}) => {
  const [homepage, homepageState] = useSinglePrismicDocument("homepage");
  const notFound = homepageState.state === "failed";
  if (homepage) {
    return (
      <PrismicProvider client={client}>
        <section className="homepage">
          <Header />
          <section className="content">
            <Hero content={homepage.data} />
            <USPSection content={homepage.data} />
            <div className="hpCTA">
              <ContactUsButton copy="Get in touch" />
            </div>
            <DemoCards content={homepage.data} />
            <FAQSection content={homepage.data} />
            <ContactUsForm />
          </section>
        </section>
      </PrismicProvider>
    );
  } else if (notFound) {
    return console.log("response notfound :( ");
  }
  return null;
};

export default Homepage;
