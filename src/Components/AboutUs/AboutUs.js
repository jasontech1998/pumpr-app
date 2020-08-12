import React from 'react';
import './AboutUs.css';
import ShaunPic from '../UI/Images/Shaun.jpg';
import JasonPic from '../UI/Images/Jason.jpg';

const aboutUs = () => {
  return (
    <div className="aboutUsWrapper">
      <h1 className="pb-3 aboutUsTitle">about us</h1>
      <div className="aboutUsRow">
        <div className="col-12 col-md-6 aboutUsCardWrapper">
          <div className="card" id="aboutUsCard">
            <img className="card-img-top aboutImage" src={ShaunPic} alt="Card image cap"/>
            <div className="card-body aboutUsBody">
              <h5 className="card-title">Shaun Tan</h5>
              <p className="card-text">Product Designer & Co-founder</p>
              <div className="linksWrapper">
                <a 
                  className="aboutUsLinks" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.linkedin.com/in/shaun-tan-0b1a5713a/">LinkedIn</a>
                <a 
                  className="aboutUsLinks" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://tanshaun.com/pumpr">Portfolio</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 aboutUsCardWrapper">
          <div className="card" id="aboutUsCard">
            <img className="card-img-top aboutImage" src={JasonPic} alt="Card image cap"/>
            <div className="card-body aboutUsBody">
              <h5 className="card-title">Jason Yu</h5>
              <p className="card-text">Software Developer & Co-founder</p>
              <div className="linksWrapper">
                <a 
                  className="aboutUsLinks" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.linkedin.com/in/jasonyu529/">LinkedIn</a>
                <a 
                  className="aboutUsLinks" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://jasontech1998.github.io/portfolio/">Portfolio</a>
                <a 
                  className="aboutUsLinks" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://github.com/jasontech1998/pumpr-app">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default aboutUs;