import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Option from './Option';

class ReviewList extends Component {
  state = {
    options: ['Knowledgable', 'Helpful', 'Motivational']
  };

  render () {
    const reviewList = (
      <Aux>
        {this.state.options.map((option, index) => {
          return (
            <Option key={index} option={option} click={this.props.click}/>
          )
        })}
      </Aux>
    );
    
    return (
      <div className="row mt-3">
        {reviewList}
      </div>
    )
  }
}

export default ReviewList;