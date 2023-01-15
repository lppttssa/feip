import React from 'react';
import s from './HomePage.module.scss';
import cn from 'classnames'
import {Header} from "../../components/Header/Header";
import {Link} from "react-router-dom";
import {Footer} from "../../components/Footer/Footer";

export const HomePage = ():JSX.Element => {
  return (
    <div className={s.home}>
      <Header />
      <main className={s.main}>
        <div className={s.promo}>
          <h2 className={cn('mainTitle', s.title)}> Новая коллекция</h2>
          <span className={s.line}></span>
          <Link to='/catalog' className={s.link}>Смотреть Новинки</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};