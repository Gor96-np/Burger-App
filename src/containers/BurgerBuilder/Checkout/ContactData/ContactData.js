import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/Ui/Button/Button';
import classes from './ContactData.css';
import axios from '../../../../axios-orders';
import Spinner from '../../../../components/Ui/Spinner/Spinner';
import Input from '../../../../components/Ui/Input/Input';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../../store/actions/index';
import { updatedObject,checkValidity } from '../../../../shared/utility'


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    require:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    require:true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    require:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    require:true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    require:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation:{},
                valid:true
            }
        },
        formIsValid:false,  
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for(let formDataEl in this.state.orderForm){
            formData[formDataEl] = this.state.orderForm[formDataEl].value
        }
    
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData:formData,
            userId:this.props.userId
        };
        this.props.onOrderBurger(order,this.props.token)
    }

    inputChangedHandler = (event,inputIdentifier) => {
      const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = updatedObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),
            touched:true
        })

            let formIsValid = true;
             for(let inputVal in updatedOrderForm) {
                 formIsValid = updatedOrderForm[inputVal].valid && formIsValid
             }

              updatedOrderForm[inputIdentifier] = updatedFormElement
                this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                         key={formElement.id}
                          elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                             inValid={!formElement.config.valid}
                              shouldValidete={formElement.config.validation}
                               touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));