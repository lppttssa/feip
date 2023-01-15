import React from 'react';
import s from './Button.module.scss'
import cn from "classnames";

type ButtonProps = {
  onClick: () => void,
  text: string,
  className?: string,
  type?: 'submit',
}

export const Button = (props: ButtonProps) => {
  const {
    onClick, text, className, type
  } = props;

  return (
    <button type={type} onClick={onClick} className={cn(s.btn, className)}>
      {text}
    </button>
  );
};