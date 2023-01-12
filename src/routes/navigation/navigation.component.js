import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { signOutUser } from "../../utils/firebase.utils";

import '../../App.css';


const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

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
          </div>
          
        </nav>
        <Outlet />
    </Fragment>
  )
}

export default Navigation;