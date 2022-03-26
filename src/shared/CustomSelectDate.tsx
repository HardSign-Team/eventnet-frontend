import React from 'react';
import "./CustomSelectDate.css"

interface Props {
    readonly className?: string;
    readonly onChange?: (...rest: any) => void;
    readonly label: string;
    readonly classNameLabel?: string;
}

const CustomSelectDate = (props: Props) => {
    return (
        <div className={props.className ?? 'custom_select_date'}>
            <p className={props.classNameLabel ?? 'label_select_date'}>{props.label}</p>
            <span className="datepicker-toggle">
                <span className="datepicker-toggle-button"></span>
                <input type="date" className="datepicker-input" onChange={props.onChange}/>
            </span>
        </div>
    )
}

export default CustomSelectDate