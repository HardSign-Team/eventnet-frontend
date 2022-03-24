import React from 'react';
import './CustomButton.css'

interface Props {
    readonly className?: string;
    readonly onClick?: (value: string) => void;
    readonly label: string;
    readonly classNameDiv?: string;
    readonly weight?: number;
    readonly height?: number;
}

const CustomButton = ({className, onClick, label, classNameDiv, weight, height}: Props) => {
    return (
        <div className={classNameDiv}>
            <button className={className ?? 'custom_button'} onClick={() => onClick} >{label}</button>
        </div>
    )
}

export default CustomButton