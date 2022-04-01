import React, { useState } from 'react';
import "./CustomSelectDate.css";
import { DatePicker, Gapped, Tooltip } from "@skbkontur/react-ui";
import { ViewDateInputValidateChecks } from '@skbkontur/react-ui/components/DateInput/ViewDateInputValidateChecks';

interface PropsDateInput {
  readonly className?: string;
  readonly date: string;
  readonly onChange: (...rest: any) => void;
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
  date,
}) => {
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const minDate = '01.01.1900';
  const maxDate = '01.01.2020';

  const unvalidate = () => {
    setError(false);
    setTooltip(false);
  };

  const validate = () => {
    const errorNew = !!date && !DatePicker.validate(date, { minDate: minDate, maxDate: maxDate });
    setError(errorNew);
    setTooltip(errorNew);
  };

  let removeTooltip = () => setTooltip(false);

 return ( <Gapped gap={10} vertical >
    <p className={classNameLabel ?? 'custom-input_label'}>{label}</p>
    <Tooltip trigger={tooltip ? 'opened' : 'closed'} render={() => 'Невалидная дата'} onCloseClick={removeTooltip}>
      <DatePicker
          error={error}
          value={date}
          onValueChange={onChange}
          onFocus={unvalidate}
          onBlur={validate}
          minDate={minDate}
          maxDate={maxDate}
          enableTodayLink
          width={width}
          style={{height: height}}
          className={className}
      />
    </Tooltip>
  </Gapped>);
};