import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import {connect} from 'react-redux';
import './Layout.css';


class Layout extends Component {

  onClickHandler = () => {
    // if user is authenticated, go to dashboard
    if (this.props.hasToken) {
      this.props.history.push('/dashboard')
    }
    // if not, go to landing page
    else {
      this.props.history.push('/')
    }
  }
  render () {
    return (
      <Aux>
        <Toolbar 
          token={this.props.hasToken}
          ownData={this.props.ownData}
          clicked={this.onClickHandler}/>
        <main className="Layout">
          <div className="container" style={{overflow: "hidden"}}>
            <div className="row">
              {this.props.children}
            </div>
          </div>
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasToken: state.auth.token !== null,
    ownData: state.pumpr.ownData
  }
}

export default connect(mapStateToProps)(Layout);