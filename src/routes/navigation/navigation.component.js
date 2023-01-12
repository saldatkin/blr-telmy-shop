import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown.component.js/cart-dropdown.component";

import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase.utils";

import '../../App.css';


const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);



  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return(
    <Fragment>
        <nav className="navbar">
          <Link to='/home'>
            { <Logo /> }
          </Link>
          <div className="navbar__links">
            <Link to='/shop'>
              SHOP
            </Link>
            <p>{ currentUser ? (
              <span onClick={signOutHandler}>
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