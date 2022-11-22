import { createContext , useReducer} from "react";

import { creactAction } from "../utilities/reducer/reducer.util";

const addCartItem = (cartItems, productToAdd ) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem );
    }

    return [ ...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCArtItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem );
}

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
}

export const CartContext = createContext({
    isCartOpen: true,
    setIsCartOpen: () => {},
    cartItems : [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    ClearItemFromCart: () => {},
    cartCount: 9,
    cartTotal: 0
})
const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 9,
    cartTotal: 0
};

const cartReducer = (state, action) => {

    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type ${type} in cartReducer`)
    }
}

export const CartProvider = ({children}) => {
    
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch]= useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItem) => {

        const newCArtCount = newCartItem.reduce((total, cartItem) =>
            total + cartItem.quantity, 0);

        const newCArtTotal = newCartItem.reduce((total, cartItem) =>
            total + cartItem.quantity * cartItem.price, 0);
        
        dispatch(creactAction(CART_ACTION_TYPES.SET_CART_ITEMS,{ cartItems: newCartItem, cartTotal: newCArtTotal, cartCount: newCArtCount }))

    }
    const addItemToCart = (productToAdd) => {
        const newCartItem = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItem)
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItem = removeCArtItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItem)
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItem = clearCartItem(cartItems, productToClear)
        updateCartItemsReducer(newCartItem)
    }
    const setIsCartOpen = (bool) => {
        dispatch(creactAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }
    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart, 
        cartItems , 
        cartCount, 
        cartTotal};
    return(
       <CartContext.Provider value={value}>{children}</CartContext.Provider> 
    )
}