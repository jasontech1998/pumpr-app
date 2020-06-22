import React, {Component} from 'react';
import Lottie from 'react-lottie';
import animationData from '../Lottie/dumbell-animation.json';

class Loader extends Component {
  render () {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <div style={{margin: "0 auto"}}>
        <Lottie options={defaultOptions}
                height={400}
                width={400}
          />
        <h3>Loading...</h3>
      </div>
    )
  }
}


export default Loader;