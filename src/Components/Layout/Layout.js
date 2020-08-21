import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import {connect} from 'react-redux';
import SideDrawer from '../SideDrawer/SideDrawer';
import AboutUs from '../AboutUs/AboutUs';
import './Layout.css';


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  openSideDrawer = () => {
    this.setState({showSideDrawer: true})
  }

  closeSideDrawer = () => {
    this.setState({showSideDrawer: false})
  }

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
    let showAboutUs = null;
    let showMobileLogo = null;
    if (this.props.history.location.pathname === "/") {
      showAboutUs = <AboutUs />
    }

    if (this.props.history.location.pathname === "/dashboard") {
      showMobileLogo = <h4 className="mobileLogo">pumpr</h4>
    }
    return (
      <Aux>
        <Toolbar 
          token={this.props.hasToken}
          ownData={this.props.ownData}
          clicked={this.onClickHandler}
          clickedBurger={this.openSideDrawer}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.closeSideDrawer}
          token={this.props.hasToken}/>
        <main className="Layout"  style={{overflow: "hidden"}}>
          <div className="container">
            <div className="row">
              {showMobileLogo}
              {this.props.children}
            </div>
          </div>
        </main>
        {showAboutUs}
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