import React, {Component} from 'react';
import Loader from '../UI/Loader/Loader';

class Confirmation extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.history.goBack()
    }, 1300)
  }
  render () {
    return (
      <Loader />
    )
  }
}

export default Confirmation;
