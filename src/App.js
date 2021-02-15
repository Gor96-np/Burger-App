import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route,Switch,withRouter,Redirect } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncOrders = asyncComponent(() => {
  return import('./containers/BurgerBuilder/Checkout/Orders/Orders')
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})
const asyncCheckout = asyncComponent(() => {
  return import('./containers/BurgerBuilder/Checkout/Checkout')
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render(){
    let routes = (
    <Switch>
       <Route path="/auth" exact component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/> 
         <Redirect to='/'/>
    </Switch>
      );

      if(this.props.isAuthenticate) {
        routes = (
          <Switch>
             <Route path="/checkout" component={asyncCheckout}/>
              <Route path="/orders" component={asyncOrders}/>
               <Route path="/logout" component={Logout}/>
                <Route path="/auth" exact component={asyncAuth}/>
                 <Route path="/" component={BurgerBuilder}/>
                  <Redirect to='/'/>
          </Switch>
        );
      }

    return(
         <div>
                <Layout>
                  {routes}   
                </Layout>
         </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticate:state.auth.token !== null
  }
}

const mapDispatchToProp = dispatch => {
  return {
    onTryAutoSignUp:() => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProp)(App));