import React from "react";
import { slide as Menu } from "react-burger-menu";
import Toolbar from "./Toolbar";
import "./SideBar.css";
import CrossMenuButton from "./CrossMenuButton";
import BurgerMenuButton from "./BurgerMenuButton";

type BarProps = {
  className: string;
  onSubmit: (e: any) => void;
};

let styles = {
  bmCrossButton: {
    opacity: "1",
    left: "calc(100% - 28px)",
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

export default function SideBar({ className, onSubmit }: BarProps) {
  return (
    <Menu
      className={className}
      customBurgerIcon={BurgerMenuButton()}
      customCrossIcon={CrossMenuButton()}
      styles={styles}
    >
      <Toolbar onSubmit={onSubmit} />
    </Menu>
  );
}
