import React from 'react';
import { Input } from '@skbkontur/react-ui';
import "./CustomInput.css"

interface Props {
    readonly className?: string;
    readonly value?: string;
    readonly onChange?: (value: string) => void;
    readonly placeholder?: string;
    readonly label: string;
    readonly mask?: string;
}

const CustomInput = ({className, value, onChange, placeholder, label , mask}: Props) => {
    return (
        <div>
            <p>{label}</p>
            <Input mask={mask} className={className} value={value} placeholder={placeholder} onValueChange={() => onChange}/>
        </div>
    )
}

export default CustomInput