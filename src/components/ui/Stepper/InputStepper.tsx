import React from 'react';
import s from './InputStepper.module.scss';
import cn from "classnames";

type InputStepperProps = {
  handleStepperChange: (step: number) => void,
  inputValue: number,
}

export const InputStepper = (props: InputStepperProps) => {
  const {
    handleStepperChange, inputValue,
  } = props;

  return (
    <div className={s.stepperContainer}>
      <button className={cn('btn-reset', s.btn, s.btnDecr)} onClick={() => handleStepperChange(-1)}>-</button>
      <input value={inputValue} type='number' min='1' max='99' className={s.input} disabled/>
      <button className={cn('btn-reset', s.btn)} onClick={() => handleStepperChange(1)}>+</button>
    </div>
  );
};