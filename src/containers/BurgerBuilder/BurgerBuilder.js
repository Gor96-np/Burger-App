import React,{ Component } from "react";
import { connect } from 'react-redux';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Aux from "../../hoc/Auxy/Aux";
import axios from "../../axios-orders";
import Spinner from "../../components/Ui/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {

   state = {
     purchasing:false,
   }

  
   componentDidMount(){
    //  console.log(this.props)
    this.props.onInitIngredient() 
  }
   
   updatePurchaseState (ingredients) {
     const sum = Object.keys(ingredients).map(igk => {
       return ingredients[igk];
     })
     .reduce((sum,el) => {
       return sum + el;
     },0);
     return sum>0
   };
  
// addIngredientHandler = (type) => {
//   const count = this.state.ingredients[type];
//   const newCount = count + 1;
//   const oldCount = {...this.state.ingredients};
//   oldCount[type] = newCount; 
  
//   const price = this.state.totalPrice;
//   const oldPrice = INGREDIENT_PRICES[type];
//   const newPrice = oldPrice + price;

//   this.setState({totalPrice:newPrice,ingredients:oldCount});
//   this.updatePurchaseState(oldCount);
 
// }

// removeIngrediantHandler = (type) => {
//   const count = this.state.ingredients[type];
//   if(count <= 0) {
//     return;
//   }
//   const newCount = count - 1;
//   const oldCount = {...this.state.ingredients};
//   oldCount[type] = newCount; 
  
//   const price = this.state.totalPrice;
//   const oldPrice = INGREDIENT_PRICES[type];
//   const newPrice = oldPrice - price;

//   this.setState({totalPrice:newPrice,ingredients:oldCount});
//   this.updatePurchaseState(oldCount);
// }

purchaseHandler =  () => {
  if(this.props.isAuthenticated ){
    this.setState({purchasing:true})
  } else {
    this.props.history.push('/auth');
    this.props.onSetAuthRedirectPath('/checkout')
  }
  
}

purchaseCanceledHandler = () => {
  this.setState({purchasing:false})
}

purchaseContinueHandler = () => {
 const queryParams = [];
 for(let i in this.props.ings){
   queryParams.push(encodeURIComponent(i) + '=' +  encodeURIComponent(this.state.ingredients[i]))
 }
 queryParams.push('price=' + this.state.totalPrice);
 const queryString = queryParams.join('&')
 this.props.history.push({
  pathname:'/checkout',
  search:'?' + queryString
})
}
purchaseContinueHandler = () => {
  this.props.onInitPurchased();
  this.props.history.push('/checkout')

}

    render(){

      const disabledInfo = {...this.props.ings};
      for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
   let orderSummary = null;
    let burger = this.props.error ? <p style={{textAlign:'center'}}>Ingredients can't be loaded!</p>: <Spinner />;

      if(this.props.ings) {
        burger = (
          <Aux>
           <Burger ingredients={this.props.ings} />
             <BuildControls 
               ingredientsAdded={this.props.onIngredientAdded}
                ingredientsRemoved={this.props.onIngredientRemoved}
                 disabledButton={disabledInfo} 
                  price={this.props.price}
                   ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                     updPurchase={this.updatePurchaseState(this.props.ings)}/>     
          </Aux>
        );
        
       orderSummary =  <OrderSummary
            ingredients={this.props.ings}
             purchaseCancelled={this.purchaseCanceledHandler}
              purchaseContinued={this.purchaseContinueHandler} 
               priceOrder={this.props.price}/>
      }

      // if(this.state.loading) {
      //   orderSummary = <Spinner /> 
      // }


        return(
         <Aux>
            <Modal show={this.state.purchasing}modalClosed={this.purchaseCanceledHandler}>
              {orderSummary}
            </Modal>
            {burger}
         </Aux>
        )
    }
}

const mapStateToProps = state => { 
    return {
      ings:state.burgerBuilder.ingredients,
       price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
         isAuthenticated:state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
     onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
      onInitIngredient:() => dispatch(actions.initIngredients()),
       onInitPurchased:() => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path) => dispatch(actions.setOutRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));