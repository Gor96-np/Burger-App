import React,{ Component } from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route,Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients:null,
    //     price:0
    // }


    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //      const ingredients = {};
    //      let price = 0;
    //     for(let param of query.entries()){
    //         //['salad','1']
    //         if(param[0] === 'price') {
    //             price = param[1]
    //         } else {
    //         ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ingredients:ingredients,totalPrice:price})
    // }
    
    

    checkoutSummaryCanceled = () => {
        this.props.history.goBack()
    }
    checkoutSummaryContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }
   
    render(){
        let summary = <Redirect to="/"/> 
        const redirectPurchased = this.props.purchased ? <Redirect to="/"/>: null; 
        if(this.props.ings) { 
            summary = (<div>
                {redirectPurchased}
                 <CheckoutSummary
                   ingredients={this.props.ings}
                    canceled={this.checkoutSummaryCanceled}
                     continued={this.checkoutSummaryContinued}/>;
                      <Route path={this.props.match.path + '/contact-data'} 
                        component={ContactData}
                      // render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />}
                      />
               </div>)
        }
        
        return summary;
    }
}


const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);