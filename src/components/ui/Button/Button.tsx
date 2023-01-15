import React from 'react';
import s from './Button.module.scss'
import cn from "classnames";

type ButtonProps = {
  onClick: () => void,
  text: string,
  className?: string,
}

export const Button = (props: ButtonProps) => {
  const {
    onClick, text, className
  } = props;

  return (
    <button onClick={onClick} className={cn(s.btn, className)}>
      {text}
    </button>
  );
};