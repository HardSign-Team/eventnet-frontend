import React from 'react';
import './CustomCheckbox.css';

interface Props {
    readonly className?: string;
    readonly onClick?: (...rest: never) => void;
    readonly label: string;
    readonly checked?: boolean;
}

const CustomCheckbox = (props: Props) => {
    return (
        <div className='custom_checkbox'>
            <label className='container'>
                {props.label}
                <input className={props.className ?? 'radio_button'} type='radio' onClick={props.onClick}
                       defaultChecked={props.checked} />
                <span className='checkmark'></span>
            </label>
        </div>
    );
};

export default CustomCheckbox;