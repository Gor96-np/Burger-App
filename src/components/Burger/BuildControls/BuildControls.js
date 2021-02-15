import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {ingName:'Salad',type:'salad'},
    {ingName:'Bacon',type:'bacon'},
    {ingName:'Cheese',type:'cheese'},
    {ingName:'Meat',type:'meat'},
]

const buildControls = (props) => (
           <div className={classes.BuildControls}>
               <p>Current price:<strong>{props.price.toFixed(2)}</strong></p>
                  {controls.map(ctr => (
                      <BuildControl
                        key={ctr.ingName}
                         ingLabel={ctr.ingName}
                          added={() => props.ingredientsAdded(ctr.type)}
                           removed={() => props.ingredientsRemoved(ctr.type)}
                            disabledLess={props.disabledButton[ctr.type]}/>
                  ))}
                  <button className={classes.OrderButton}
                    disabled={!props.updPurchase}
                     onClick={props.ordered}>{props.isAuth ? "Order Now":"SIGN UP TO ORDER"}</button>
           </div>
)

export default buildControls;
