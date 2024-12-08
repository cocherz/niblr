import React from "react";
import { useState, useEffect } from "react";
import config from "./Config";
import mixpanel from "mixpanel-browser";
import Homepage from "./homepage";
import MenuApp from "./MenuApp";
import { PrismicProvider } from "@prismicio/react";
import { client } from "./prismic";

mixpanel.init("3599157b1d90af99d6c05e17416a8f1e", { debug: false, track_pageview: true, persistence: "localStorage" });

export const App = () => {
  const [subdomain, setSubdomain] = useState(window.location.hostname.split(".")[0]);
  const [currentConfig, setCurrentConfig] = useState(config.client[subdomain]);


  useEffect(() => {
    const newSubdomain = window.location.hostname.split(".")[0];
    const newConfig = config.client[newSubdomain];
    setSubdomain(newSubdomain);
    if (!newConfig) {
      window.location.replace(`http://niblr.co.uk`);
    } else {
      document.title = `Niblr - ${newConfig.name}`;
      setCurrentConfig(newConfig);
    }
  }, [subdomain]);

  if (subdomain === "niblr" || subdomain === "localhost") {
    return (
      <PrismicProvider client={client(currentConfig.currentRepoName, currentConfig.accessToken)}>
        <Homepage currentConfig={currentConfig} />
      </PrismicProvider>
    );
  } else if (currentConfig) {
    return (
      <PrismicProvider client={client(currentConfig.currentRepoName, currentConfig.accessToken)}>
        <section className="menu-app-container">
          <MenuApp subdomain={subdomain} currentConfig={currentConfig} />
        </section>
      </PrismicProvider>
    );
  }
}

export default App;
