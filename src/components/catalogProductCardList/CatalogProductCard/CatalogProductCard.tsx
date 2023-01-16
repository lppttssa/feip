import React, {useState} from 'react';
import s from './CatalogProductCard.module.scss';
import {ProductCartType} from "../../../types";
import {useCartState} from "../../../context/shopping-cart/Context";
import {Button} from "../../ui/Button/Button";
import {Link} from "react-router-dom";
import {Select} from "../../ui/Select/Select";

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

  const [size, setSize] = useState('');

  const {
    state: { cart },
    addItem,
    removeItem
  } = useCartState();

  const isItemInCart = () => {
    return cart.some((item: any) => item.sku === sku && item.size === size);
  }

  const handleCartChange = () => {
    if (size) {
      const params: ProductCartType = {title, price, sku, image: img, size};
      isItemInCart() ? removeItem(params) : addItem(params)
    }
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
        <div className={s.selectContainer}>
          <Select
            isOnlyValueSelect
            selectItems={['XS', 'S', 'M', 'L']}
            selectDefaultTitle={'Выберите размер'}
            handleChoose={(val) => setSize(val[0])}
            isBig
          />
        </div>
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