import React from "react";
// eslint-disable-next-line
import { useState, useEffect } from "react";


import config from "./Config";
import mixpanel from "mixpanel-browser";
// eslint-disable-next-line
import Homepage from "./homepage";
import MenuApp from "./MenuApp";
import { PrismicProvider } from "@prismicio/react";
import { client } from "./prismic";

mixpanel.init("3599157b1d90af99d6c05e17416a8f1e", { debug: false, track_pageview: true, persistence: "localStorage" });



export const TestApp = () => {

 

  // eslint-disable-next-line
  const [subdomain, setSubdomain] = useState(window.location.hostname.split(".")[0]);
  // eslint-disable-next-line
  const [currentConfig, setCurrentConfig] = useState(config.client[subdomain]);

  //console.log(config.client.thelongbar.accessToken);
  //console.log(config.client.thelongbar.currentRepoName);
  return (
    <PrismicProvider client={client(config.client.thelongbar.currentRepoName, config.client.thelongbar.accessToken)}>
      <section className="menu-app-container">
        <MenuApp subdomain={'thelongbar'} currentConfig={config.client.thelongbar} />
      </section>
    </PrismicProvider>
  );
};

export default TestApp;
