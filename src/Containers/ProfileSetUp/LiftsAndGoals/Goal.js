import React, {Component} from 'react';
import './Goal.css';

class Goal extends Component {
  state = {
    isSelected: false
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.selectedGoals !== this.props.selectedGoals) {
      if (this.props.selectedGoals.includes(this.props.goal)) {
        this.setState({isSelected: true});
      };
    };
  }

  changeColor = () => {
    this.setState({isSelected: !this.state.isSelected});
  }
  
  render () {
    const {isSelected} = this.state;
    return (
      <div
        className="d-flex col-12 col-md-6 col-lg-3 mb-3">
        <div
          onClick={() => {this.props.click(this.props.goal); this.changeColor()}}
          className={`card card-body flex-fill ${isSelected ? 'selected' : 'notSelected'}`}
          >{this.props.goal}</div>
      </div>
    )
  }
}

export default Goal;