import React, {Component} from 'react';
import './scheduleModal.css';
import Button from '../../../Components/UI/Button/Button';

class ScheduleModal extends Component {
  render () {
    const options = [
      {value: "6 AM", text: "6 AM"},
      {value: "7 AM", text: "7 AM"},
      {value: "8 AM", text: "8 AM"},
      {value: "9 AM", text: "9 AM"},
      {value: "10 AM", text: "10 AM"},
      {value: "11 AM", text: "11 AM"},
      {value: "12 PM", text: "12 PM"},
      {value: "1 PM", text: "1 PM"},
      {value: "2 PM", text: "2 PM"},
      {value: "3 PM", text: "3 PM"},
      {value: "4 PM", text: "4 PM"},
      {value: "5 PM", text: "5 PM"},
      {value: "6 PM", text: "6 PM"},
      {value: "7 PM", text: "7 PM"},
      {value: "8 PM", text: "8 PM"},
      {value: "9 PM", text: "9 PM"},
      {value: "10 PM", text: "10 PM"},
      {value: "11 PM", text: "11 PM"},
      {value: "12 AM", text: "12 AM"},
      {value: "1 AM", text: "1 AM"},
      {value: "2 AM", text: "2 AM"},
      {value: "3 AM", text: "3 AM"},
      {value: "4 AM", text: "4 AM"},
      {value: "5 AM", text: "5 AM"}
    ]
    let firstFromInput = (
      options.map( o => {
        return (
          <option key={o.value} value={o.value}>{o.text}</option>
        )
      })
    );
    let firstToInput = null;
    let secondFromInput = null;
    let secondToInput = null;
    let thirdFromInput = null;
    let thirdToInput = null;
   
    // first fromInput has been selected, update first toInput
    if (this.props.fromInput) {
      // get index of array
      const index = options.findIndex(o => o.value === this.props.fromInput);
      // remove all elements on and before that index
      const updateOptions = options.slice(index + 1, options.length)
      firstToInput = (
        updateOptions.map( o => {
          return (
            <option key={o.value}value={o.value}>{o.text}</option>
          )
        })
      )
    }
    // first toInput has been selected, update second fromInput
    if (this.props.toInput) {
      // get index of array
      const index = options.findIndex(o => o.value === this.props.toInput);
      // remove all elements on and before that index
      const updateOptions = options.slice(index + 1, options.length)
      secondFromInput = (
        updateOptions.map( o => {
          return (
            <option key={o.value}value={o.value}>{o.text}</option>
          )
        })
      )
    }
    // second fromInput has been selected, update second toInput
    if (this.props.fromInput2) {
      // get index of array
      const index = options.findIndex(o => o.value === this.props.fromInput2);
      // remove all elements on and before that index
      const updateOptions = options.slice(index + 1, options.length)
      secondToInput = (
        updateOptions.map( o => {
          return (
            <option key={o.value}value={o.value}>{o.text}</option>
          )
        })
      )
    }
    // second toInput has been selected, update third fromInput
    if (this.props.toInput2) {
      // get index of array
      const index = options.findIndex(o => o.value === this.props.toInput2);
      // remove all elements on and before that index
      const updateOptions = options.slice(index + 1, options.length)
      thirdFromInput = (
        updateOptions.map( o => {
          return (
            <option key={o.value}value={o.value}>{o.text}</option>
          )
        })
      )
    }
    // third fromInput has been selected, update third toInput
    if (this.props.fromInput3) {
      // get index of array
      const index = options.findIndex(o => o.value === this.props.fromInput3);
      // remove all elements on and before that index
      const updateOptions = options.slice(index + 1, options.length)
      thirdToInput = (
        updateOptions.map( o => {
          return (
            <option key={o.value}value={o.value}>{o.text}</option>
          )
        })
      )
    }
    // Show secondInput if this.state.addedInputs >= 1
    let showSecondInput = null;
    if (this.props.addedInputs >= 1) {
      showSecondInput = (
        <div className="d-flex align-items-center justify-content-center">
            <span className="mr-3">from</span>
            <select
              onChange={this.props.changed}
              className="form-control timeOption mr-3"
              name="fromInput2"
              defaultValue={"Default"}>
              <option value="Default">N/A</option>
              {secondFromInput}
            </select>
            <span className="mr-3">to</span>
            <select
              onChange={(event) => this.props.changed(event)}
              className="form-control timeOption"
              name="toInput2"
              defaultValue={"Default"}>
              <option value="Default">N/A</option>
              {secondToInput}
            </select>
        </div>
      );
    };
    // Show thirdInput if this.state.addedInputs >= 2
    let showThirdInput = null;
    if (this.props.addedInputs >= 2) {
      showThirdInput = (
        <div className="d-flex align-items-center justify-content-center">
            <span className="mr-3">from</span>
            <select
              onChange={this.props.changed}
              className="form-control timeOption mr-3"
              name="fromInput3"
              defaultValue={"Default"}>
              <option value="Default">N/A</option>
              {thirdFromInput}
            </select>
            <span className="mr-3">to</span>
            <select
              onChange={(event) => this.props.changed(event)}
              className="form-control timeOption"
              name="toInput3"
              defaultValue={"Default"}>
              <option value="Default">N/A</option>
              {thirdToInput}
            </select>
        </div>
      );
    };

    // If user addedInputs, show MinusIcon
    let showMinusIcon = null ;
    if (this.props.addedInputs >= 1) {
      showMinusIcon = (
        <i 
          onClick={this.props.minusClicked}
          className="fas fa-minus-circle fa-2x my-2"></i>);
    };
    // At 3 addedInputs, remove plusIcon
    let showPlusIcon = ( 
      <i 
      onClick={this.props.plusClicked}
      className="fas fa-plus-circle fa-2x my-2 mr-2"></i>);
    if (this.props.addedInputs === 2) {
      showPlusIcon = null;
    };

    // Error Handling
    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <p className="errorMsg">Please fill out the entire form.</p>;
    }
    return (
      <div>
        <h3 className="mt-2">{this.props.day}</h3>
        {errorMsg}
        <small className="text-muted">Input your availability for this day</small>
        <div className="topInput d-flex align-items-center justify-content-center">
            <span className="mr-3">from</span>
            <select
              onChange={(event) => this.props.changed(event)}
              className="form-control timeOption mr-3"
              name="fromInput"
              defaultValue={"Default"}>
              <option value="Default" disabled>N/A</option>
              {firstFromInput}
            </select>
            <span className="mr-3">to</span>
            <select
              onChange={(event) => this.props.changed(event)}
              className="form-control timeOption"
              name="toInput"
              defaultValue={"Default"}>
              <option value="Default">N/A</option>
              {firstToInput}
            </select>
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