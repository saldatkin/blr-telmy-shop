import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((cartItem) => {
                    console.log(cartItem.imageUrl);
                    return <CartItem key={cartItem.id} cartItem={cartItem} />
                })}
                <Link className='goto-btn' to='/checkout'>Go to checkout</Link>
            </div>
        </div>
    )
}

export default CartDropdown;