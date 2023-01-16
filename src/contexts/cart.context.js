import { createContext, useEffect, useState } from "react";


const addCartItem = (cartItems, productToAdd) => {
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

const cartReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case 'SET_CART_ITEMS':
        return {
          ...state,
          ...payload,
        };
      default:
        throw new Error(`Unhandled type ${type} in cartReducer`);
    }
  };


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    overallPrice: 0,
    setOverallPrice: () => {}
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [overallPrice, setOverallPrice] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const removeProductFromCart = (productToRemove) => {
        setCartItems(removeProduct(cartItems, productToRemove))
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])
    
    useEffect(() => {
        const sumOfPrices = cartItems.reduce((total, { price, quantity }) => total + price * quantity, 0)
        setOverallPrice(sumOfPrices);
    }, [cartItems])


    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart,
        removeProductFromCart,
        cartItems, 
        cartCount,
        overallPrice,
        setOverallPrice 
    }

    return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}