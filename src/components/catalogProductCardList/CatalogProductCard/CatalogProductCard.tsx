import React from 'react';
import s from './CatalogProductCard.module.scss';
import {ProductCartType} from "../../../types";
import {useCartState} from "../../../context/shopping-cart/Context";
import {Button} from "../../ui/Button/Button";
import {Link} from "react-router-dom";

type ItemCardProps = {
  id: number,
  img: string,
  title: string,
  price: number,
  brand: string,
  sku: string,
};

const CatalogProductCard = (props: ItemCardProps) => {
  const {
    img, title, price, brand, sku, id
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
      <Link to={`/product/${id}`}>
        <img src={img} alt={title} className={s.img}/>
      </Link>
      <div className={s.infoContainer}>
        <span className={s.title}>{title}</span>
        <span className={s.priceContainer}>
          <span className={s.priceValue}>{price}</span>
          <span className={s.priceCurrency}>руб.</span>
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