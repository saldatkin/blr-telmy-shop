import { useDispatch, useSelector } from "react-redux";
import { 
    addItemToCart, 
    removeItemFromCart,
    removeProductFromCart,
 } from "../../store/cart/cart.action";
import { selectCartItems, selectOverallPrice } from "../../store/cart/cart.selector";

import './checkout.styles.scss'

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const overallPrice = useSelector(selectOverallPrice);

    const dispatch = useDispatch();

    return(
        <div >
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
                                onClick={() => dispatch(removeItemFromCart(cartItems,cartItem))} 
                                className="change-quantity-btn">&#10094;</button>
                            <p>
                                { quantity }
                            </p>
                            <button 
                                onClick={() => dispatch(addItemToCart(cartItems, cartItem))} 
                                className="change-quantity-btn">&#10095;</button>
                        </div>
                        <div>{ price * quantity }</div>
                        <button 
                            onClick={() => dispatch(removeProductFromCart(cartItems, cartItem))} 
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