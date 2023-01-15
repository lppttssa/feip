import React from 'react';
import s from './Input.module.scss';
import cn from "classnames";

type InputProps = {
  value: any,
  onChange: (e: any) => void,
  type: 'text' | 'number' | 'email',
  placeholder: string,
  className?: string,
}

export const Input = (props: InputProps):JSX.Element => {
  const {
    value, onChange, placeholder, type, className
  } = props;

  return (
    <input required className={cn(className, s.input)} value={value} onChange={onChange} placeholder={placeholder} type={type} />
  );
};