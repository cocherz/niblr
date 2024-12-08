
import React from 'react';
import Logo from './Components/Logo';  
// import Spinner from './Components/Spinner';
import CreatedBy from './Components/CreatedBy';


const LoadingScreen = () => {

  return (
    <div className="loading-screen no-scroll">
        <Logo />
        <CreatedBy />
    </div>
  );
};

export default LoadingScreen;