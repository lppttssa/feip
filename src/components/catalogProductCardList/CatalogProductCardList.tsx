import React from 'react';
import s from './CatalogProductCardList.module.scss';
import {BrandType, ProductType} from "../../types";
import CatalogProductCard from "./CatalogProductCard/CatalogProductCard";
import {getBrandNameById} from "../../functions";

type ItemCardListProps = {
  products: ProductType[],
  brands: BrandType[],
};

export const CatalogProductCardList = (props: ItemCardListProps):JSX.Element => {
  const {
    products, brands,
  } = props;

  return (
    <ul className={s.cardList}>
      {products.map((item) => (
        <li className={s.card}>
          <CatalogProductCard
            key={item.id}
            img={item.image}
            title={item.title}
            price={item.price}
            brand={getBrandNameById(item.brand, brands)}
            sku={item.sku}
            type={item.type}
          />
        </li>
      ))}
    </ul>
  );
};