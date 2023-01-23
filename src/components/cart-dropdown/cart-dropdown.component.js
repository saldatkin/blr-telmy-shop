import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';

import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
  
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((cartItem) => {
                    return <CartItem key={cartItem.id} cartItem={cartItem} />
                })}
                <Link className='goto-btn' to='/checkout'>Go to checkout</Link>
            </div>
        </div>
    )
}

export default CartDropdown;