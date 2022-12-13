import React, { useState } from "react";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const drawerOpenHandler = () => {
    setDrawerIsOpen(true);
  };

  const BackdropHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={BackdropHandler} />}
        <SideDrawer show={drawerIsOpen} onClick={BackdropHandler}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={drawerOpenHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          {" "}
          <Link to="/">YourPlaces</Link>{" "}
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};
export default MainNavigation;
