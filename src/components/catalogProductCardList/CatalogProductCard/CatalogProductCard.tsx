import React from 'react';
import s from './CatalogProductCard.module.scss';
import {PriceType, ProductCartType} from "../../../types";
import {useCartState} from "../../../context/shopping-cart/Context";
import {Button} from "../../ui/Button/Button";

type ItemCardProps = {
  img: string,
  title: string,
  price: PriceType,
  brand: string,
  sku: string,
  type: string,
};

const CatalogProductCard = (props: ItemCardProps) => {
  const {
    img, title, price, brand, sku, type,
  } = props;

  const {
    state: { cart },
    addItem,
    removeItem
  } = useCartState();

  const isItemInCart = () => {
    return cart.some((item: any) => item.sku === sku);
  }

  const handleCartChange = () => {
    const params: ProductCartType = {title, price, sku, image: img};
    isItemInCart() ? removeItem(params) : addItem(params)
  }

  return (
    <div className={s.itemCard}>
      <img src={img} alt={title} className={s.img}/>
      <div className={s.infoContainer}>
        <span className={s.title}>{title}</span>
        <span className={s.priceContainer}>
          <span className={s.priceValue}>{price.value}</span>
          <span className={s.priceCurrency}>{price.currency}</span>
        </span>
        <span className={s.brand}>{brand}</span>
        <Button
          onClick={handleCartChange}
          text={isItemInCart() ? 'Удалить' : 'В корзину'}
          className={s.btn}
        />
      </div>
    </div>
  );
};

export default CatalogProductCard;