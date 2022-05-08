import React, { useState } from "react";
import { Menu, MenuItem, ProSidebar, SidebarContent } from "react-pro-sidebar";
import "./SideBar.css";
import "react-pro-sidebar/dist/css/styles.css";
import EventList from "../EventList/EventList";
import Toolbar from "./Toolbar/Toolbar";
import BurgerMenuButton from "./Buttons/BurgerMenuButton";
import CrossMenuButton from "./Buttons/CrossMenuButton";

type BarProps = {
  className: string;
};

let sideBarContentStyles = {
  backgroundColor: "#D7DCD7",
  padding: "1em 2em 0",
  fontSize: "1.15em",
  position: "relative",
  height: "100%",
} as const;

let sideBarStyles = {
  position: "relative",
  overflowY: "auto",
  color: "#323232",
  fontSize: "14px",
} as const;

export default function SideBar({ className }: BarProps) {
  const [menuCollapse, setMenuCollapse] = useState(true);

  return (
    <div className={className}>
      <ProSidebar
        collapsedWidth={1}
        collapsed={menuCollapse}
        className={className + "__bar"}
        style={sideBarStyles}
        width={"400px"}
      >
        <SidebarContent style={sideBarContentStyles}>
          <Toolbar />
          <EventList />
        </SidebarContent>
      </ProSidebar>
      <div
        className={"closemenu"}
        onClick={() => setMenuCollapse(!menuCollapse)}
        style={!menuCollapse ? { transform: "translateX(-28px)" } : {}}
      >
        {menuCollapse ? <BurgerMenuButton /> : <CrossMenuButton />}
      </div>
    </div>
  );
}
