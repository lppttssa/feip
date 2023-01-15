import React from 'react';
import s from './Header.module.scss';
import cn from 'classnames'
import {LogoIcon} from "../ui/icons/LogoIcon";
import {Link} from "react-router-dom";
import {ShoppingCartIcon} from "../ui/icons/ShoppingCartIcon";
import {headerLinks} from "../../data/data";
import {useCartState} from "../../context/shopping-cart/Context";


type HeaderProps = {
  styled?: boolean,
};

export const Header = (props: HeaderProps):JSX.Element => {
  const {
    styled,
  } = props;

  const {state: {cart}} = useCartState();

  return (
    <header className={cn('container', s.header)}>
      <nav className={s.nav}>
        <ul className={cn(s.list, s.listLeft)}>
          {headerLinks.map((item) => (
            <li className={s.listItem} key={item.id}>
              <Link to={item.link} className={cn(s.link, { [s.styled]: styled } )}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
          <Link to='/'>
            <LogoIcon className={cn(s.logo, { [s.styled]: styled })} />
          </Link>
        <ul className={s.listRight}>
          <li className={s.listItem}>
            <Link to='/cart' className={s.cartLink}>
              {!!cart.length && <span className={s.itemsNumber}>{cart.length}</span>}
              <ShoppingCartIcon className={cn(s.shoppingCart, { [s.styled]: styled })} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};