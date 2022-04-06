import React from "react";
import { slide as Menu } from "react-burger-menu";
import Toolbar from "./Toolbar";
import "./SideBar.css";
import SlideMenuButton from "./SlideMenuButton";

type BarProps = {
  className: string;
};

const styles = {
  bmCrossButton: {
    position: "absolute",
    left: "calc(100% - 28px)",
    width: "55px",
    height: "55px",
    color: "#59C7C7",
    top: "calc(50% - 70px)",
    transform: "rotate(180deg)",
  },
  bmOverlay: {
    background: "transparent",
    zIndex: "0",
    overflowY: "scroll",
  },
} as const;

export default function props({ className }: BarProps) {
  return (
    <Menu
      {...props}
      className={className}
      customBurgerIcon={SlideMenuButton()}
      customCrossIcon={SlideMenuButton()}
      styles={styles}
    >
      <Toolbar />
    </Menu>
  );
}
