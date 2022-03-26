import React from 'react';
import './CustomButton.css'

interface Props {
    readonly className?: string;
    readonly onClick?: (...rest: any) => void;
    readonly label: string;
    readonly classNameDiv?: string
}

const CustomButton = ({className, onClick, label, classNameDiv}: Props) => {
    return (
        <div className={classNameDiv}>
            <button className={className ?? 'custom_button'} onClick={onClick} >{label}</button>
        </div>
    )
}

export default CustomButton