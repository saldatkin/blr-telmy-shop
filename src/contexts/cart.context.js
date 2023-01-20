import { createContext, useReducer, useState } from "react";


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


const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    overallPrice: 0
}

const cartReducer = (state, action) => {
    const { payload } = action;

    return {
        ...state,
        ...payload,
    };
};

export const CartProvider = ({ children }) => {    
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [cartState, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const {  
        cartItems, 
        cartCount, 
        overallPrice 
    } = cartState;


    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newOverallPrice = newCartItems.reduce((total, { price, quantity }) => total + price * quantity, 0);

        dispatch({ 
            type: 'SET_CART_ITEMS', 
            payload: {
                cartItems: newCartItems,
                overallPrice: newOverallPrice,
                cartCount: newCartCount
            }
        });
    }


    const addItemToCart = (itemToAdd) => {
        const newCartItems = addCartItem(cartItems, itemToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (itemToRemove) => {
        const newCartItems = removeCartItem(cartItems, itemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const removeProductFromCart = (productToRemove) => {
        const newCartItems = removeProduct(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }


    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart,
        removeProductFromCart,
        cartItems, 
        cartCount,
        overallPrice,
    }

    return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}