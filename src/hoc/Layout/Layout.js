import React, {Component} from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Aux from '../Auxy/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Toolbar/SideDrawer/SideDrawer';


class Layout extends Component {
   state = {
      showSideDrawer:false,
   }

   sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer:false})    
   }
   sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
        return { showSideDrawer:!prevState.showSideDrawer }
      })    
     }


   render(){
      return(
      <Aux>
           <Toolbar auth={this.props.isAuthenticated} drawerToggleHandler={this.sideDrawerToggleHandler} /> 
           <SideDrawer
            auth={this.props.isAuthenticated}
            closed={this.sideDrawerClosedHandler}
            open={this.state.showSideDrawer} />
              <main className={classes.Content}>
                  {this.props.children}
              </main>
      </Aux>
      )
   }
};

const mapStateToProps = state => {
   return {
      isAuthenticated:state.auth.token !== null
   }
}
export default connect(mapStateToProps)(Layout);