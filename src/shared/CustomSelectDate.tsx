import React from 'react';
import './CustomSelectDate.css';
import { DatePicker, Gapped } from '@skbkontur/react-ui';

interface PropsDateInput {
    readonly className?: string;
    readonly date: string;
    readonly onChange?: (...rest: any) => void;
    readonly label: string;
    readonly classNameLabel?: string;
    readonly height?: number;
    readonly width?: number;
}

export const CustomSelectDate: React.FC<PropsDateInput> = ({
                                                               className,
                                                               classNameLabel,
                                                               label,
                                                               onChange,
                                                               height,
                                                               width = 320,
                                                               date
                                                           }) => {
    return (
        <Gapped vertical gap={7}>
            <p className={classNameLabel ?? 'custom-input_label'}>{label}</p>
            <DatePicker style={{ width: width, height: height }} onValueChange={() => onChange} className={className}
                        enableTodayLink value={date} />
        </Gapped>
    );
};