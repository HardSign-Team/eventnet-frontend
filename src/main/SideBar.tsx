import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Toolbar from './Toolbar';

const buttonStyleOpen = {
    transform: 'matrix(0, 1, -1, 0, 0, 0)'
};

const buttonStyleClose = {
    transform: 'matrix(0, -1, 1, 0, 0, 0)'
};

type BarProps = {
    className: string;
    width?: number | string | undefined;
};

function getCustomMenuButton() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClick = (e: any) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <button
            onClick={onClick}
            className="button buttonMenu"
            style={!isOpen ? buttonStyleOpen : buttonStyleClose}
        >
            {'>'}
        </button>
    );
}

export default function props({ className, width }: BarProps) {
    return (
        <Menu
            {...props}
            className={className}
            width={width}
            customBurgerIcon={getCustomMenuButton()}
            customCrossIcon={getCustomMenuButton()}
            styles={{
                bmCrossButton: {
                    position: 'absolute',
                    width: '55px',
                    height: '55px',
                    color: '#59C7C7',
                    top: 'calc(50% - 70px)',
                    transform: "rotate(180deg)",
                },
                bmOverlay: {
                    background: 'transparent',
                    zIndex: '0',
                    overflowY: 'scroll'
                }
            }}
        >
            <Toolbar />
        </Menu>
    );
}
