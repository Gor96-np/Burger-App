import React from 'react';

import classes from './Input.css'

const input = (props) => {

    let inputElement = null;
    const inputClass = [classes.InputElement];
    if(props.inValid && props.shouldValidete && props.touched) {
        inputClass.push(classes.Invalid)
    } 

    switch(props.elementType){
        case('input'):
         inputElement = <input className={inputClass.join(' ')}
                           {...props.elementConfig} 
                             value={props.value}
                              onChange={props.changed}/>;
           break;
        case('textarea'):
         inputElement = <textarea className={inputClass.join('')}
                          {...props.elementConfig} 
                             value={props.value}
                              onChange={props.changed}/>;
           break;
        case('select'):
         inputElement = (
             <select
                  className={inputClass.join(' ')}
                   value={props.value}
                   onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                      <option key={option.value}
                                value={option.value}>
                                  {option.displayValue}
                      </option>
                  ))}
             </select>
         );
            break;
        default:
            inputElement = <input className={classes.InputElement}
                            {...props.elementConfig} 
                             value={props.value}
                              onChange={props.changed}/>
    }

    return(
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;