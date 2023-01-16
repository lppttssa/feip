import {CartActionsType, CartStateType, CartType, ProductCartType} from "../../types";

const changeQuantity = (cart: CartType[], product: ProductCartType, step: number) => {
  const itemIndex = cart.findIndex(item => item.sku === product.sku && item.size === product.size);
  let newCart = [...cart];
  if (itemIndex >= 0) {
    let newItem = {...newCart[itemIndex]};
    newItem.quantity += step;
    if (newItem.quantity > 0) {
      newCart[itemIndex] = newItem;
    }
  }
  return newCart;
}

export const cartReducer = (state: CartStateType, action: CartActionsType): CartStateType => {
  switch (action.type) {
    case 'ADD_TO_CART':
      localStorage.setItem('cart', JSON.stringify([...state.cart, {...action.item, quantity: 1}]));
      return {...state, cart: [...state.cart, {...action.item, quantity: 1}]};
    case 'CHANGE_QUANTITY':
      localStorage.setItem('cart', JSON.stringify(changeQuantity(state.cart, action.item, action.step)));
      return {...state, cart: changeQuantity(state.cart, action.item, action.step)};
    case 'REMOVE_FROM_CART':
      localStorage.setItem('cart',
          JSON.stringify(state.cart.filter(item => (item.sku !== action.item.sku) || (item.sku === action.item.sku && item.size !== action.item.size) )));
      return {...state, cart: state.cart.filter(item => (item.sku !== action.item.sku) || (item.sku === action.item.sku && item.size !== action.item.size))};
    case 'CLEAR_CART':
      localStorage.setItem('cart', JSON.stringify([]));
      return {...state, cart: []}
    default:
      return state;
  }
}