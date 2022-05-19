import React, { useState } from "react";
import { ProSidebar, SidebarContent } from "react-pro-sidebar";
import "./SideBar.css";
import "react-pro-sidebar/dist/css/styles.css";
import EventList from "../EventList/EventList";
import Toolbar from "./Toolbar/Toolbar";
import BurgerMenuButton from "./Buttons/BurgerMenuButton";
import CrossMenuButton from "./Buttons/CrossMenuButton";

type BarProps = {
  className: string;
  onSubmit: (e: any) => void;
};

export default function SideBar({ className, onSubmit }: BarProps) {
  const [menuCollapse, setMenuCollapse] = useState(true);

  return (
    <div className={className}>
      <ProSidebar collapsedWidth={1} collapsed={menuCollapse} width={"350px"}>
        <SidebarContent>
          <Toolbar onSubmit={onSubmit} />
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
