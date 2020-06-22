import React from 'react';
import Aux from '../../../hoc/Aux';

const options = (props) => {
  let options = (
    props.options.map((option, index) => {
      return (
            <div className="col-12 col-md-4 col-lg-6" key={index}>
              <p className="reviewBlock" style={{minWidth: '130px'}}>{option}</p>
            </div>
      )
    })
  )
  return (
    <Aux>
      {options}
    </Aux>
  )
}


export default options;