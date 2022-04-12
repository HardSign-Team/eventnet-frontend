import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import Toolbar from "./Toolbar";
import "./SideBar.css";
import CrossMenuButton from "./CrossMenuButton";
import BurgerMenuButton from "./BurgerMenuButton";

type BarProps = {
  className: string;
};

let styles = {
  bmCrossButton: {
    left: "0",
    width: "55px",
    top: "calc(50% - 70px)",
    color: "#59C7C7",
    height: "55px",
    transform: "rotate(180deg)",
  },
  bmOverlay: {
    background: "transparent",
    zIndex: "0",
    overflowY: "scroll",
  },
};

export default function SideBar({ className }: BarProps) {
  const [open, setOpen] = useState(false);
  return (
    <Menu
      className={className}
      customBurgerIcon={BurgerMenuButton()}
      customCrossIcon={CrossMenuButton()}
      styles={styles}
      isOpen={open}
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true);
        styles.bmCrossButton.left = "calc(100% - 28px)";
      }}
    >
      <Toolbar />
    </Menu>
  );
}
