import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../../Ui/Backdrop/Backdrop';
import Aux from '../../../../hoc/Auxy/Aux';


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer,classes.Close];
    if(props.open || props.openClick) {
        attachedClasses  = [classes.SideDrawer,classes.Open]
    }
   return (
       <Aux>
         <Backdrop show={props.open}  clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}onClick={props.closed}>
                      <div className={classes.Logo}>
                         <Logo />
                      </div>
                  <nav>
                       <NavigationItems authentication={props.auth} />
                  </nav>  
            </div>
       </Aux>
       
   )

}

export default sideDrawer;