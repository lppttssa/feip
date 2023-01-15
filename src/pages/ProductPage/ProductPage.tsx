import React, {useEffect, useState} from 'react';
import s from './ProductPage.module.scss';
import {getData} from "../../requets";
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import cn from "classnames";
import {Select} from "../../components/ui/Select/Select";
import {Button} from "../../components/ui/Button/Button";

export const ProductPage = ():JSX.Element => {
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  useEffect(() => {
    getData('/products.json').then(response => setProduct(response[0]));
  }, []);

  return (
    <div className={cn('container', s.productPage)}>
      <Header styled />
      <div className={s.content}>
        <div className={s.imgContainer}>
          <div className={s.smallImgBlock}>
            <div className={s.smallImgContainer}>
              <img className={cn(s.smallImg, s.firstImage)} src={product?.image} alt=""/>
            </div>
            <div className={s.smallImgContainer}>
              <img className={cn(s.smallImg, s.secondImage)} src={product?.image} alt=""/>
            </div>
            <div className={s.smallImgContainer}>
              <img className={cn(s.smallImg, s.thirdImage)} src={product?.image} alt=""/>
            </div>
            <div className={s.smallImgContainer}>
              <img className={cn(s.smallImg, s.fourthImage)} src={product?.image} alt=""/>
            </div>
            <div className={s.smallImgContainer}>
              <img className={cn(s.smallImg, s.fifthImage)} src={product?.image} alt=""/>
            </div>
          </div>
          <img src={product?.image} alt={product?.title}/>
        </div>
        <div className={s.mainInfo}>
          <span className={s.productTitle}>{product?.title}</span>
          <span className={s.price}>{`${product?.price.value} ${product?.price.currency}`}</span>
          <div className={s.selectContainer}>
            <Select
              selectItems={['XS', 'S']}
              selectDefaultTitle={'Выберите размер'}
              handleChoose={(val) => setSelectedSize(val[0])}
              isOnlyValueSelect
              styled
            />
          </div>
          <Button className={s.btn} onClick={() => console.log()} text='В корзину' />
          <p className={s.descriptionTitle}>Состав</p>
          <p className={s.description}>{product?.composition}</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};