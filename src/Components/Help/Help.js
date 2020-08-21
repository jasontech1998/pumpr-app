import React from 'react'
import helpOne from '../UI/Images/helpOne.png';
import helpTwo from '../UI/Images/helpTwo.png';
import helpThree from '../UI/Images/helpThree.png';

import './Help.css';

const help = () => {
  return (
    <div className="helpWrapper">
      <h3 className="helpTitle">create your profile</h3>
      <p className="helpContent mb-5">enter your lifts, set your schedule, and select your goals</p>
      <img 
        className="helpImage mb-5"
        src={helpOne}
        alt="create_a_profile"/>
      <h3 className="helpTitle mt-5">send messages and offers</h3>
      <p className="helpContent mb-5">set a date and time with others to work out</p>
      <img 
        className="helpImage mb-5"
        src={helpTwo}
        alt="create_a_profile"/>
      <h3 className="helpTitle mt-5">stay updated</h3>
      <p className="helpContent mb-5">post on your timeline to keep others updated on your progress</p>
      <img 
        className="helpImage"
        src={helpThree}
        alt="create_a_profile"/>
    </div>
  )
}


export default help;