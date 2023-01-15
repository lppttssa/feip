import React from 'react';
import s from './CartPage.module.scss';
import sBtn from '../../components/ui/Button/Button.module.scss';
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {useCartState} from "../../context/shopping-cart/Context";
import {CartProductCard} from "../../components/CartProductCard/CartProductCard";
import cn from "classnames";
import {Link} from "react-router-dom";

export const CartPage = ():JSX.Element => {
  const {state: {cart}, removeItem, changeQuantity} = useCartState();

  const fullCartData = () => (
    <>
      <h2 className={s.title}>Ваш заказ</h2>
      <ul className={cn('list-reset')}>
        {cart.map((item) => (
          <CartProductCard
              img={item.image}
              price={item.price}
              quantity={item.quantity}
              sku={item.sku}
              title={item.title}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
          />
        ))}
      </ul>
    </>
  );

  const emptyCartData = () => (
    <div className={s.emptyCartContainer}>
      <span className={s.emptyText}>Ваша корзина пуста</span>
      <Link to='/catalog'className={sBtn.btn}>Перейти к покупкам</Link>
    </div>
  );

  return (
    <div className={s.cartPage}>
      <Header styled />
      <main className={'container'}>
        {!!cart.length ? fullCartData() : emptyCartData()}
      </main>
      <Footer />
    </div>
  );
};