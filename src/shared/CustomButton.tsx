import React from 'react';
import './CustomButton.css'

interface Props {
    readonly className?: string;
    readonly onClick?: (value: string) => void;
    readonly page: string;
    readonly classNameDiv?: string
}

const CustomButton = ({className, onClick, page, classNameDiv}: Props) => {
    return (
        <div className={classNameDiv}>
            <button className={className ?? 'custom_button'} onClick={() => onClick} >{page}</button>
        </div>
    )
}

export default CustomButton