import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Options from './Options';

class Reviews extends Component {

  render () {
    let showReviews = null;
    if (this.props.reviews) {
      // Reverse reviews to show latest review first
      const copyReviews = this.props.reviews.slice();
      const reverseReviews = copyReviews.reverse();
      showReviews = (
        <Aux>
          {reverseReviews.map((review, index) => {
            let options = null;
            if (review.options) {
              options =  <Options options={review.options}/>
            }
            let picture = `/static/media/social.15eeae14.svg`;
            if (review.senderPic) {
              picture = review.senderPic;
            };
            return (
              <Aux key={index}>
                <div className="col-2 d-flex justify-content-center">
                  <img 
                      className="rounded-circle"
                      src={picture}
                      alt="icon" 
                      height="100" width="100"/>
                </div>
                <div className="col-8 d-flex align-items-end">
                  <div>
                    <p style={{fontWeight: '500'}}>{review.senderName}</p>
                    <p style={{minWidth: "800px"}}>{review.msg}</p>
                    <div className="row mt-3">
                      {/* Feedback Options */}
                      {options}
                    </div>
                  </div>
                </div>
                <div className="col-2 d-flex justify-content-end">
                <p className="reviewDate">{review.date}</p>
                </div>
              </Aux>
            )
          })}
        </Aux>
      );
    };
    
    return (
      <Aux>
        {showReviews}
      </Aux>
    )
  }
}

export default Reviews;