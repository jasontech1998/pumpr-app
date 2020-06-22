import React from 'react';
import classes from './HowItWorks.module.css';

const howItWorks = (props) => {
  return (
    <div className={classes.HowItWorks}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="text-center mb-5">how it works</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-4 text-center mt-2">
            <i className="far fa-file-alt fa-5x d-none d-md-block mb-2"></i>
            <p className="lead mb-3" style={{fontWeight: '600'}}>create your profile</p>
            <p className="p-info">Fill out all of the necessary information like your fitness goals, location, and current lifts.</p>
          </div>
            <div className="col-4 text-center mt-2">
            <i className="far fa-handshake fa-5x d-none d-md-block mb-2"></i>
            <p className="lead mb-3" style={{fontWeight: '600'}}>find a partner</p>
            <p className="p-info">Pumpr will match you up with potential partners. These partners will be of similar fitness levels and work out at a gym near you.</p>
          </div>
          <div className="col-4 text-center mt-2">
            <i className="fas fa-dumbbell fa-5x d-none d-md-block mb-2"></i>
            <p className="lead mb-3" style={{fontWeight: '600'}}>make gains</p>
            <p className="p-info">You and your new workout partner can arrange a meetup and start making gains!</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default howItWorks;
