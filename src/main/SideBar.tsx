import React from "react";
import { slide as Menu } from "react-burger-menu";
import Toolbar from "./Toolbar";

type BarProps = {
    className: string;
    width?: number | string | undefined;
};

export default function props({className, width}: BarProps){
    return (
        <Menu {...props} className={className} width={width}>
            <Toolbar/>
        </Menu>
    );
}