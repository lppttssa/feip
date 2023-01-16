import React, {useEffect, useState} from 'react';
import s from './HomePage.module.scss';
import cn from 'classnames'
import {Header} from "../../components/Header/Header";
import {Link} from "react-router-dom";
import {Footer} from "../../components/Footer/Footer";
import {getData} from "../../requets";
import {CategoryCard} from "../../components/CategoryCard/CategoryCard";

export const HomePage = ():JSX.Element => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getData('categories').then(response => setCategories(response));
  }, []);

  return (
    <div className={s.home}>
      <Header />
      <main className={s.main}>
        <section className={s.promo}>
          <h2 className={cn('mainTitle', s.title)}> Новая коллекция</h2>
          <span className={s.line}></span>
          <Link to='/catalog' className={s.link}>Смотреть Новинки</Link>
        </section>
        <section className={cn('container', s.categories)}>
          <h3 className={s.title}>Категории</h3>
          <div className={s.categoriesContainer}>
            {categories.map((item: any) => (
              <Link to={`/catalog/${item.ID}`} className={s.flexItem}>
                <CategoryCard key={item.ID} img={item.Image} title={item.Name} />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};