import { Outlet, Link } from "react-router-dom";
import { Fragment , useContext} from "react";
import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import './nav.style.scss'
import { sigOutUser } from "../../utilities/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext)

    return(
        <Fragment>
            <div className="navigation">
                <Link className='logo-container' to='/'>
                  <CrwnLogo className='logo'/>
                </Link>    
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                SHOP
                </Link>
                {
                    currentUser ? (
                        <span className="nav-link" onClick={sigOutUser}> SIGN OUT</span>
                        ):( <Link className="nav-link" to='/auth'>
                        SIGN IN
                        </Link>
                    )
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation