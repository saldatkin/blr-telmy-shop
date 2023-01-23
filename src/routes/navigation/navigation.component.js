import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { signOutUser } from "../../utils/firebase.utils";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component.js";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import '../../App.css';


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  console.log(isCartOpen);

  return(
    <Fragment>
        <nav className="navbar">
          <Link to='/'>
            { <Logo /> }
          </Link>
          <div className="navbar__links">
            <Link to='/shop'>
              SHOP
            </Link>
            <p>{ currentUser ? (
              <span onClick={signOutUser}>
                SIGN OUT
              </span>
            ) : (
              <Link to='/auth'>
                SIGN IN
              </Link>
            )}</p>
            <CartIcon />
            { isCartOpen && <CartDropdown /> }
          </div>
        </nav>
        <Outlet />
    </Fragment>
  )
}

export default Navigation;