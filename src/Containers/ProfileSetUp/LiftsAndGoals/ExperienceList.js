import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import './Experience.css';

class ExperienceList extends Component {
  state = {
    expArray: ['Beginner', 'Intermediate', 'Advanced'],
    selected: null
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.selectedExp !== this.props.selectedExp) {
      this.setState({selected: this.props.selectedExp});
    };
  }


  selectedHandler = (level) => {
    if (this.state.selected !== level) {
      this.setState({selected: level});
    }
    else if (this.state.selected === level) {
      this.setState({selected: null});
    };
  }

  render () {
    const expList = (
      <Aux>
        {this.state.expArray.map((level, index) => {
          let selectExp = 'notSelected'
          if (this.state.selected === level) {
            selectExp = 'selected'
          }
          return (
            <div className="d-flex justify-content-center col-12 col-md-6 col-lg-4 mb-3" key={index}>
              <div 
                className='card card-body flex-fill'
                id={selectExp}
                onClick={() => {this.props.click(level); this.selectedHandler(level)}}>
                {level}
              </div>
            </div>
          )
        })}
      </Aux>
    );

    return (
      <div>
        <div className="d-flex flex-wrap" style={{maxWidth: "500px", margin: "auto"}}> 
          {expList}
        </div>
      </div>
    )
  }
}

export default ExperienceList;