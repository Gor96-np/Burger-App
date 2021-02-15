import React,{ Component } from 'react';

import Button from '../../Ui/Button/Button';
import Aux from '../../../hoc/Auxy/Aux';

class OrderSummary extends Component {

  render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map(igk => {
      return (
        <li  key={igk}>
              <span style={{textTransform:'capitalize'}}>
                  {igk}</span>:{this.props.ingredients[igk]}
        </li>
      )
})
    return(
      <Aux>
               <h3>Your Order</h3>
               <p>A delicious burger with  the following ingredients:</p>
               <ul>
                 {ingredientSummary}
               </ul>
                <p><strong>Total Price:{this.props.priceOrder.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
               <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
               <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
              
      </Aux>
    );
  }
} 

export default OrderSummary;