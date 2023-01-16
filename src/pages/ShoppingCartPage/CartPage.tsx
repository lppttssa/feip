import React, {useState} from 'react';
import s from './CartPage.module.scss';
import sBtn from '../../components/ui/Button/Button.module.scss';
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {useCartState} from "../../context/shopping-cart/Context";
import {CartProductCard} from "../../components/CartProductCard/CartProductCard";
import cn from "classnames";
import {Link} from "react-router-dom";
import {Input} from "../../components/ui/Input/Input";
import {Radio} from "../../components/ui/Radio/Radio";
import {Button} from "../../components/ui/Button/Button";

export const CartPage = ():JSX.Element => {
  const {state: {cart}, removeItem, changeQuantity, clearCart} = useCartState();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [post, setPost] = useState('');
  const [postOffice, setPostOffice] = useState('');
  const [city, setCity] = useState('');
  const [isOrderSent, setOrderSent] = useState(false);

  const handleOrderSend = () => {
    const body = {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      post: post,
      postOffice: postOffice,
      city: city,
      order: cart,
    }
    if (!!name.length && !!surname.length && !!email.length && !!phone.length && !!postOffice.length && !!city.length) {
      return fetch(`https://jsonplaceholder.typicode.com/posts`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(body)
          }
      )
          .then(response => response.json())
          .then((responseData) => {
            setOrderSent(true);
            clearCart();
          })
    }

  }

  const fullCartData = () => (
    <>
      <h2 className={s.title}>Ваш заказ</h2>
      <ul className={cn('list-reset', s.cardsList)}>
        {cart.map((item) => (
          <CartProductCard
              img={item.image}
              price={item.price}
              quantity={item.quantity}
              sku={item.sku}
              title={item.title}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
              size={item.size}
          />
        ))}
      </ul>
      <p className={s.totalPrice}>
        К оплате:
        <span
          className={s.price}>
          {`${cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)} руб.`}
        </span>
      </p>
      <h3 className={s.title}>Оформление заказа</h3>
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        <div className={s.leftSide}>
          <h4 className={s.formTitle}>Персональные данные</h4>
          <div className={s.topInputContainer}>
            <div className={s.inputColumnContainer}>
              <Input className={s.input} value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Ваше имя*' />
              <Input className={s.input} value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Ваш e-mail*' />
            </div>
            <div className={s.inputColumnContainer}>
              <Input className={s.input} value={surname} onChange={(e) => setSurname(e.target.value)} type='text' placeholder='Ваша фамилия*' />
              <Input className={s.input} value={phone} onChange={(e) => setPhone(e.target.value)} type='text' placeholder='Ваш телефон*'/>
            </div>
          </div>
          <h4 className={s.formTitle}>Способ доставки:</h4>
          <div className={s.radioContainer}>
            <div className={s.column}>
              <Radio className={s.radio} label='Почта России' value={'RussianPost'} onChange={(e) => setPost(e.target.value)} name={'post'} />
              <Radio label='СДЭК' value={'SDEK'} onChange={(e) => setPost(e.target.value)} name={'post'} />
            </div>
            <div className={s.column}>
              <Radio className={s.radio} label='Boxberry' value={'Boxberry'} onChange={(e) => setPost(e.target.value)} name={'post'} />
              <Radio label='DPD' value={'DPD'} onChange={(e) => setPost(e.target.value)} name={'post'} />
            </div>
          </div>
          <h4 className={s.formTitle}>Адрес доставки:</h4>
          <div className={s.addressContainer}>
            <Input className={s.input} value={city} onChange={(e) => setCity(e.target.value)} type='text' placeholder='Город*' />
            <Input value={postOffice} onChange={(e) => setPostOffice(e.target.value)} type='text' placeholder='Отделение почты*' />
          </div>
        </div>
        <div className={s.rightSide}>
          <span className={s.title}>Доставка:<span className={s.data}>По тарифам перевозчика</span></span>
          <span className={s.title}>Итого:<span className={s.data}>{`${cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)} руб.`}</span></span>
          <Button type='submit' onClick={handleOrderSend} text={'ОФОРМИТЬ ЗАКАЗ'} />
          <p className={s.conditions}>Нажимая на кнопку «оплатить заказ», я принимаю условия публичной оферты и политики конфиденциальности</p>
        </div>
      </form>
    </>
  );

  const emptyCartData = () => (
    <div className={s.emptyCartContainer}>
      <span className={s.emptyText}>{isOrderSent ? 'Ваш заказ успешно отправлен' : 'Ваша корзина пуста'}</span>
      <Link to='/catalog' className={sBtn.btn}>Перейти к покупкам</Link>
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