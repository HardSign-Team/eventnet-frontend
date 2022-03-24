import React from 'react';
import './CustomButton.css'

interface Props {
    readonly className?: string;
    readonly onClick?: (value: string) => void;
    readonly label: string;
    readonly classNameDiv?: string;
    readonly width?: number;
    readonly height?: number;
}

const CustomButton = ({className, onClick, label, classNameDiv, width, height}: Props) => {
    return (
        <div className={classNameDiv}>
            <button style={{height: height, width: width}} className={className ?? 'custom_button'} onClick={() => onClick} >{label}</button>
        </div>
    )
}

export default CustomButton