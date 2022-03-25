import React, { useState } from 'react';
import "./GenderSelector.css"
import CustomCheckbox from './CustomCheckbox';

interface Props {
    readonly classNameLabel?: string;
    readonly label: string;
    readonly classNameDiv?: string;
}

const GenderSelector = (props: Props) => {
    const [isMale, setIsMale] = useState(false);
    return (
        <div className={props.classNameDiv ?? "gender_selector"}>
            <p className={props.classNameLabel ?? "label__gender_selector"}>{props.label}</p>
            <div className='change_gender'>
                            <span className='male_sex'>
                                <CustomCheckbox label="Мужчина" checked={isMale} onClick={() => setIsMale(true)}/>
                            </span>
                <span className='female_sex'>
                               <CustomCheckbox label="Женщина" checked={!isMale} onClick={() => setIsMale(false)}/>
                </span>
            </div>
        </div>
    )
}

export default GenderSelector