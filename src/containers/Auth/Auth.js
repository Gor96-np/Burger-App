import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/Ui/Input/Input';
import Button from '../../components/Ui/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/Ui/Spinner/Spinner';
import { updatedObject,checkValidity } from '../../shared/utility';

class Auth extends Component {
   state = {
       controls:{
        email: {
            elementType: 'imput',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation:{
                require:true,
                isEmail:true
            },
            valid:false,
            touched:false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation:{
                require:true,
                minLength:6
            },
            valid:false,
            touched:false
        },
       },
       isSignUp:true,
   };
   
   componentDidMount() {
       if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
           this.props.onsetAuthRedirectPath()
       }
   }


isSignUpHandler = () =>{
    this.setState(prevState => {
        return {isSignUp:!prevState.isSignUp};
    })
}
submitHandler  = (event) => {
    event.preventDefault(); 
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
}

inputChangedHandler = (event,controlName) =>  {
    const updatedControls = updatedObject(this.state.controls,{
        [controlName]:updatedObject(this.state.controls[controlName],{
            value:event.target.value,
            valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
            touched:true
        }) 
    })
  this.setState({controls:updatedControls})
}
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let form = formElementsArray.map(formElement => {
           return ( <Input
                key={formElement.id}
                 elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                    inValid={!formElement.config.valid}
                     shouldValidete={formElement.config.validation}
                      touched={formElement.config.touched}
                       changed={(event) => this.inputChangedHandler(event,formElement.id)} />)
        })
    if(this.props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if(this.props.error) {
        errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if(this.props.isAuthenticated) {
        authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                     {form}
                     <Button btnType="Success">SUBMIT</Button>
                </form>
        <Button clicked={this.isSignUpHandler}btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN': 'SIGNUP'}</Button>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
         error:state.auth.error,
          isAuthenticated:state.auth.token !== null,
           buildingBurger:state.burgerBuilder.building,
            authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProp = dispatch => {
    return {
        onAuth:(email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
         onsetAuthRedirectPath:() => dispatch(actions.setOutRedirectPath('/'))
    };
};

export default connect(mapStateToProps,mapDispatchToProp)(Auth);