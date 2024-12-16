
import React from 'react';
import { ReactComponent as NiblrLogo } from "../../img/Niblr.svg";

const CreatedBy = () => {

  return (
    <a href='https://www.niblr.co.uk' className='noselect non-scrollable '>
    <div className="createBy">
      <span>Powered by</span>
      <NiblrLogo className='niblr-logo' />
    </div>
  </a>
  );
};

export default CreatedBy;