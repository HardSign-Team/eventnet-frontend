import React, { useState } from "react";
import { ProSidebar, SidebarContent } from "react-pro-sidebar";
import "./SideBar.css";
import "react-pro-sidebar/dist/css/styles.css";
import EventList from "../EventList/EventList";
import Toolbar from "./Toolbar/Toolbar";
import BurgerMenuButton from "./Buttons/BurgerMenuButton";
import CrossMenuButton from "./Buttons/CrossMenuButton";
import { observer } from "mobx-react-lite";
import globalStore from "../../../stores/GlobalStore";

type BarProps = {
  className: string;
  onSubmit: (e: any) => void;
};

const SideBar = observer(({ className, onSubmit }: BarProps) => {
  const [menuCollapse, setMenuCollapse] = useState(true);

  const onOpen = () => {
    const circles = globalStore.eventLocationStore.getAll();
    globalStore.eventStore.addEvents(circles.map((event) => event.id));
  };

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
        {menuCollapse ? (
          <BurgerMenuButton onClick={onOpen} />
        ) : (
          <CrossMenuButton />
        )}
      </div>
    </div>
  );
});

export default SideBar;
