import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'
import './cart-icon.styles.scss'


const CartIcon = () => {
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const dispatch = useDispatch();
  
    const handleCartClick = () => {
        return dispatch(setIsCartOpen(!isCartOpen));
    }

    return(
        <div 
            onClick={handleCartClick} 
            className='cart-icon-container'>
                <ShoppingIcon className='shopping-icon'/>
                <span className='item-count'>{ cartCount }</span>
        </div>
    )
}

export default CartIcon;