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
          clicked={this.onClickHandler}/>
        <main className="Layout">
          <div className="container">
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
    hasToken: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);