import React, { useState } from 'react';
import './GenderSelector.css';
import { CustomCheckbox } from './CustomCheckbox';

interface Props {
    readonly classNameLabel?: string;
    readonly label: string;
    readonly classNameDiv?: string;
    readonly onChange?: (...rest: any) => void;
}

export const GenderSelector: React.FC<Props> = ({
                                                    classNameLabel,
                                                    classNameDiv,
                                                    label,
                                                    onChange = () => console.log('change gender')
                                                }) => {
    const [isMale, setIsMale] = useState(true);

    const changeGender = (gender: boolean) => {
        setIsMale(gender);
        onChange(gender ? 'Male' : 'Female');
    };

    return (
        <div className={classNameDiv ?? 'gender_selector'}>
            <p className={classNameLabel ?? 'label__gender_selector'}>{label}</p>
            <div className='change_gender'>
                <span className='male_gender'>
                    <CustomCheckbox label='Мужчина' checked={isMale} onClick={() => changeGender(true)} />
                </span>
                <span className='female_gender'>
                    <CustomCheckbox label='Женщина' checked={!isMale} onClick={() => changeGender(false)} />
                </span>
            </div>
        </div>
    );
};