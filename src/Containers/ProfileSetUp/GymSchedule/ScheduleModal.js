import React, {Component} from 'react';
import './scheduleModal.css';
import Button from '../../../Components/UI/Button/Button';

class ScheduleModal extends Component {
 
  render () {
    // Show secondInput if this.state.addedInputs >= 1
    let showSecondInput = null
    if (this.props.addedInputs >= 1) {
      showSecondInput = (
        <div>
          <label>from</label>
          <input
            name="fromInput2"
            value={this.props.fromInput2}
            onChange={this.props.changed}
            className="timeInput" 
            type="text"
            placeholder="5 PM"/>
          <label>to</label>
          <input 
            name="toInput2"
            value={this.props.toInput2}
            onChange={this.props.changed}
            className="timeInput"
            type="text"
            placeholder="7 PM"/>
        </div>
      )
    }
    // Show thirdInput if this.state.addedInputs >= 2
    let showThirdInput = null
    if (this.props.addedInputs >= 2) {
      showThirdInput = (
        <div>
          <label>from</label>
          <input
            name="fromInput3"
            value={this.props.fromInput3}
            onChange={this.props.changed}
            className="timeInput" 
            type="text"
            placeholder="9 PM"/>
          <label>to</label>
          <input 
            name="toInput3"
            value={this.props.toInput3}
            onChange={this.props.changed}
            className="timeInput"
            type="text"
            placeholder="11 PM"/>
        </div>
      )
    }

    // If user addedInputs, show MinusIcon
    let showMinusIcon = null 
    if (this.props.addedInputs >= 1) {
      showMinusIcon = (
        <i 
          onClick={this.props.minusClicked}
          className="fas fa-minus-circle fa-2x my-2"></i>)
    }
    // At 3 addedInputs, remove plusIcon
    let showPlusIcon = ( 
      <i 
      onClick={this.props.plusClicked}
      className="fas fa-plus-circle fa-2x my-2 mr-2"></i>
    )
    if (this.props.addedInputs === 2) {
      showPlusIcon = null;
    }


    return (
      <div>
        <h3 className="mt-2">{this.props.day}</h3>
        <small className="text-muted">Input your availability for this day</small>
        <div className="topInput">
          <label>from</label>
          <input
            onChange={this.props.changed}
            name="fromInput"
            value={this.props.fromInput}
            className="timeInput" 
            type="text"
            placeholder="8 AM"/>
          <label>to</label>
          <input 
            onChange={this.props.changed}
            name="toInput"
            value={this.props.toInput}
            className="timeInput"
            type="text"
            placeholder="10 AM"/>
        </div>
        {showSecondInput}
        {showThirdInput}
        <small className="text-muted">you can input up to 3 different time slots</small>
        <div>
          {showPlusIcon}
          {showMinusIcon}
        </div>
        <Button 
          click={this.props.onClick}>Continue</Button>
      </div>
    )
  }
}

export default ScheduleModal