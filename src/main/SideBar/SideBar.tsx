import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import Toolbar from "./Toolbar";
import "./SideBar.css";
import CrossMenuButton from "./CrossMenuButton";
import BurgerMenuButton from "./BurgerMenuButton";
import EventList from "../EventList/EventList";

type BarProps = {
  className: string;
};

let styles = {
  bmCrossButton: {
    opacity: "1",
    left: "calc(100% - 32px)",
    width: "55px",
    top: "calc(50% - 70px)",
    color: "#59C7C7",
    height: "55px",
  },
  bmOverlay: {
    background: "transparent",
    zIndex: "0",
    overflowY: "scroll",
  },
};

export default function SideBar({ className }: BarProps) {
  return (
    <Menu
      className={className}
      customBurgerIcon={BurgerMenuButton()}
      customCrossIcon={CrossMenuButton()}
      styles={styles}
    >
      <Toolbar />
    </Menu>
  );
}
