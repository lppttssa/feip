import React, {createContext, useContext, useReducer} from 'react';
import {CartContextType} from "../../types";
import {cartReducer} from "./Reducer";

const CartContext = createContext<CartContextType>({
  state: {cart: []},
  addItem: () => null,
  removeItem: () => null,
  changeQuantity: () => null,
});

export const CartContextComponent = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
  });

  const addItem = (params: any) => {
    dispatch({ type: "ADD_TO_CART", item : {...params} });
  };

  const removeItem = (params: any) => {
    dispatch({type: "REMOVE_FROM_CART", item: {...params}})
  }

  const changeQuantity = (params: any, step: number) => {
    dispatch({type: "CHANGE_QUANTITY", step: step, item: {...params}})
  }

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, changeQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartState = () => {
  return useContext(CartContext);
}