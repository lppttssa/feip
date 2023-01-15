import React from 'react';
import s from './CategoryCart.module.scss';

type CategoryCardProps = {
  title: string,
  img: string,
}

export const CategoryCard = (props: CategoryCardProps):JSX.Element => {
  const {
    title, img
  } = props;

  return (
    <div className={s.card}>
      <img src={img} alt={title} className={s.img}/>
      <p className={s.title}>{title}</p>
    </div>
  );
};