import React, { Component } from "react";
import {connect} from 'react-redux';

import Order from "../../../../components/Order/CheckoutSummary/Order/Order";
import axios from "../../../../axios-orders";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import Spinner from '../../../../components/Ui/Spinner/Spinner';
import * as actions from '../../../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId)
    }
    // componentDidMount() {
    //    axios.get('/orders.json').then(response => {
    //        const fetchedOrders = [];
    //        for(let key in response.data){
    //            fetchedOrders.push({
    //                ...response.data[key],
    //                id:key
    //            })
    //        }
    //         this.setState({loading:false,orders:fetchedOrders}) 
    // }).catch(err => {
    //     this.setState({loading:false})
    // })
    // }
     render() {
    let orders = <Spinner />;
    if(!this.props.loading) {
        orders =  this.props.orders.map(order => (
         <Order  key={order.id}
                  ingredients={order.ingredients}
                   price={+order.price}/>
        ))
    }
        
        // let form = (
        //     <div>
        //        {orders}
        //     </div>
        // )
        // if(this.state.loading) {
        //     form = <Spinner />
        // }

         return(
              <div>
                  {orders}
              </div>
         )
     }
}

const mapStateToProps = state => {
    return {
      orders:state.order.orders,
      loading:state.order.loading,
      token:state.auth.token,
      userId:state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
       onFetchOrders:(token,userId) => dispatch(actions.fetchOrders(token,userId))
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));