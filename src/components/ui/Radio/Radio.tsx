import React from 'react';
import s from './Radio.module.scss';
import cn from "classnames";

type RadioProps = {
  label: string,
  value: any,
  onChange: (e: any) => void,
  name: string,
  className?: string,
}

export const Radio = (props: RadioProps) => {
  const {
    label, value, onChange, name, className
  } = props;
  return (
    <label className={cn(className, s.label)}>
      <input value={value} name={name} onChange={onChange} className={s.input} type='radio'/>
      {label}
    </label>
  );
};