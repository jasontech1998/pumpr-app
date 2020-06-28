import React, {Component} from 'react';

class Option extends Component {
  state = {
    isSelected: false
  };

  changeColor = () => {
    this.setState({isSelected: !this.state.isSelected});
  }

  render () {
    const {isSelected} = this.state;
    return (
      <div className="col-4">
        <div 
          onClick={() => {this.props.click(this.props.option); this.changeColor()}}
          style={{padding: '10px'}}
          className={`card card-body flex-fill feedbackOptions ${isSelected ? 'selected' : 'notSelected'}`}>
          {this.props.option}
        </div>
      </div>
    )
  }
}

export default Option;