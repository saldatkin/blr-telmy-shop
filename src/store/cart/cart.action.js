import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from '../../utils/reducer.utils';



const addCartItem = (cartItems, productToAdd) => {
  console.log(cartItems);
  const isCartItemExists = cartItems.find((cartItem) => {
      return cartItem.id === productToAdd.id;
  })
  if(isCartItemExists){
      return cartItems.map((cartItem) => {
          return cartItem.id === productToAdd.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
      })
  }
  return [ ...cartItems, { ...productToAdd, quantity: 1}]
}


const removeCartItem = (cartItems, productToRemove) => {
  return productToRemove.quantity > 0 
      ? decreaseCartItems(cartItems, productToRemove) 
      : removeProduct(cartItems, productToRemove);
}

const decreaseCartItems = (cartItems, productToRemove) =>  {
  return cartItems.map((cartItem) => {
      return cartItem.id === productToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
  })
}

const removeProduct = (cartItems, productToRemove) =>  {
  return cartItems.filter((cartItem) => {
      return cartItem.id !== productToRemove.id
  })
}

export const addItemToCart = (cartItems,itemToAdd) => {
  const newCartItems = addCartItem(cartItems, itemToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems,itemToRemove) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeProductFromCart = (cartItems,productToRemove) => {
  const newCartItems = removeProduct(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


export const setIsCartOpen = (boolean) => 
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const setCartItems = (array) => 
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, array)