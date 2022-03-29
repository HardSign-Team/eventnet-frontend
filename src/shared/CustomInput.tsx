import React from 'react';
import { Input, PasswordInput } from '@skbkontur/react-ui';
import "./CustomInput.css"

interface Props {
    readonly type?: string;
    readonly className?: string;
    readonly value?: string;
    readonly onChange?: (...rest: any) => void;
    readonly placeholder?: string;
    readonly label: string;
    readonly mask?: string;
}

const CustomInput = ({className, value, onChange = () => console.log('Input'), placeholder, label, mask, type = 'default'}: Props) => {
        if (type === 'default')
        return (
         <div>
            <p className={'custom-input_label'}>{label}</p>
            <Input style={{"width": "320px","height": "36px"}} mask={mask} className={className} value={value} placeholder={placeholder}
                   onValueChange={value => onChange(value)}/>
        </div>
    ); else
        return (
            <div>
                <p className={'custom-input_label'}>{label}</p>
                <PasswordInput className={className} value={value} detectCapsLock  onValueChange={value => onChange ? onChange(value) : null} width={320} style={{"height": "36px"}} />
            </div>
        )
}

export default CustomInput