import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import CattyShopLogo from "../../assets/logo/catty-shop-logo.png";
import "./navigation.style.scss";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation-bar">
        <Link className="logo-link" to="/">
          <img src={CattyShopLogo} alt="Catty Shop logo" />
        </Link>

        <div className="links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/login">
            LOGIN
          </Link>
          <Link className="nav-link" to="/register">
            REGISTER
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
