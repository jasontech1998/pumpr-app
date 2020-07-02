import React from 'react';
import Aux from '../../../hoc/Aux';

const options = (props) => {
  let options = (
    props.options.map((option, index) => {
      return (
            <div className="col-md-3 optionsWrapper" key={index}>
              <p className="reviewBlock" style={{minWidth: '130px'}}>{option}</p>
            </div>
      )
    })
  );
  
  return (
    <Aux>
      {options}
    </Aux>
  )
}


export default options;