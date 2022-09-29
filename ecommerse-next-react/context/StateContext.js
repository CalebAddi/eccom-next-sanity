import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [qty, setQty] = useState(1);
    let foundProduct;
    let idx;
{/*------------------------------------------------------------------------------------------*/}
    const onAdd = (product, qty) => {
        const checkProdInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * qty);
        setTotalQty((prevTotalQty) => prevTotalQty + qty);

        if(checkProdInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {...cartProduct, qty: cartProduct.qty + qty};
            })

            setCartItems(updatedCartItems);

        } else {
            product.qty = qty;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }
{/*---------------------------------------------------------*/}
    // Remove item from cart
    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.qty);
        setTotalQty(prevTotalQty => prevTotalQty - foundProduct.qty);
        setCartItems(newCartItems);
    }

{/*---------------------------------------------------------*/}
    // Toggle item qty in cart
    const togCartItemQty = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        idx = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if(value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, qty: foundProduct.qty + 1 } ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQty(prevTotalQty => prevTotalQty + 1)

        } else if(value === 'dec') {
            if(foundProduct.qty > 1) {
                setCartItems([...newCartItems, { ...foundProduct, qty: foundProduct.qty - 1 } ]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQty(prevTotalQty => prevTotalQty - 1)
            }
        }
    }

{/*------------------------------------------------------------------------------------------*/}
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return;
            else return prevQty - 1;
        })
    }
{/*---------------------------------------------------------*/}
    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQty,
            qty,
            incQty,
            decQty,
            onAdd,
            onRemove,
            togCartItemQty
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
