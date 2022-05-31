import React, { useState } from "react";
import "./CustomSelectDate.css";
import { DatePicker, Gapped, Tooltip } from "@skbkontur/react-ui";

interface PropsDateInput {
  readonly className?: string;
  readonly date: string;
  readonly onChange: (...rest: any) => void;
  readonly label: string;
  readonly classNameLabel?: string;
  readonly height?: number;
  readonly width?: number;
  readonly isEmpty?: boolean;
}

export const CustomSelectDate: React.FC<PropsDateInput> = ({
  className,
  classNameLabel,
  label,
  onChange,
  height,
  width = 320,
  date,
  isEmpty = false,
}) => {
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const minDate = "01.01.1900";
  const maxDate =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();

  const unvalidate = () => {
    setError(false);
    setTooltip(false);
  };

  const validate = () => {
    const errorNew =
      !!date &&
      !DatePicker.validate(date, { minDate: minDate, maxDate: maxDate });
    setError(errorNew);
    setTooltip(errorNew);
  };

  let removeTooltip = () => setTooltip(false);

  return (
    <Gapped gap={7} vertical>
      <p className={classNameLabel ?? "custom-input_label"}>{label}</p>
      <Tooltip
        trigger={tooltip ? "opened" : "closed"}
        render={() => "Невалидная дата"}
        onCloseClick={removeTooltip}
      >
        <DatePicker
          error={error || isEmpty}
          value={date}
          onValueChange={onChange}
          onFocus={unvalidate}
          onBlur={validate}
          minDate={minDate}
          maxDate={maxDate}
          enableTodayLink
          width={width}
          style={{ height: height }}
          className={className}
        />
      </Tooltip>
    </Gapped>
  );
};
