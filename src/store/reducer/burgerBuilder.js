import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility'

const initialState = {
    ingredients:null,
     totalPrice:4,
     error:false,
     building:false
}

const INGREDIENT_PRICES = {
  salad:0.5,
  bacon:0.7,
  cheese:0.4,
  meat:1.3
}

const addIngredient = (state,action) => {
  const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName] +1}
   const updatedIngredients = updatedObject(state.ingredients,updatedIngredient);
   const updatedState = {ingredients:updatedIngredients, totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],building:true};
    return updatedObject(state,updatedState)
}
const removeIngredient = (state,action) => {
  const updatedIngr = {[action.ingredientName]:state.ingredients[action.ingredientName] -1}
   const updatedIngrs = updatedObject(state.ingredients,updatedIngr);
    const updatedSt = {ingredients:updatedIngrs, totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],building:true}
     return updatedObject(state,updatedSt)
}
const setIngredients = (state,action) => {
  return {...state, ingredients:{
      salad:action.ingredients.salad,
      bacon:action.ingredients.bacon,
      cheese:action.ingredients.cheese,
      meat:action.ingredients.bacon},
    error:false,
    totalPrice:4,
    building:false
  }
}
const fetchIngredientsFailed = (state,action) => {
  return updatedObject(state,{error:true})
}
const reducer = (state = initialState,action) => {
      switch(action.type) {
        case actionTypes.ADD_INGREDIENT:return addIngredient(state,action)
        case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state,action)
        case actionTypes.SET_INGREDIENTS:return setIngredients(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state,action)
        default: return state;

      }
}

export default reducer;