import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import './checkout.styles.scss'

const Checkout = () => {
    const { 
        cartItems, 
        addItemToCart, 
        removeItemFromCart, 
        removeProductFromCart,
        overallPrice,
    } = useContext(CartContext);


    return(
        <div >
            <table>
                <thead>
                    <tr className="checkout">
                        <th>Product</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
            </table>
            {
            cartItems.map((cartItem) => {
                const { imageUrl, price, name, quantity,id } = cartItem;
                
                return(
                    <div key={id} className="checkout">
                        <div style={{
                            background: `url(${imageUrl}) no-repeat center`
                        }} className="checkout__img"></div>
                        <div>{ name }</div>
                        <div className="checkout__quantity">
                            <button 
                                onClick={() => removeItemFromCart(cartItem)} 
                                className="change-quantity-btn">&#10094;</button>
                            <p>
                                { quantity }
                            </p>
                            <button 
                                onClick={() => addItemToCart(cartItem)} 
                                className="change-quantity-btn">&#10095;</button>
                        </div>
                        <div>{ price * quantity }</div>
                        <button 
                            onClick={() => removeProductFromCart(cartItem)} 
                            className="change-quantity-btn">&#10005;
                        </button>
                    </div>)
                })
            }
            
            <table>
                <thead>
                    <tr className="checkout">
                        <th>Product</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>{ overallPrice }</th>
                    </tr>
                </thead>
            </table>

        </div>
        
    )

}

export default Checkout;