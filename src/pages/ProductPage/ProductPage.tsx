import React, {useEffect, useState} from 'react';
import s from './ProductPage.module.scss';
import {getData} from "../../requets";
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import cn from "classnames";
import {Select} from "../../components/ui/Select/Select";
import {Button} from "../../components/ui/Button/Button";
import {useParams} from 'react-router-dom';

export const ProductPage = ():JSX.Element => {
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const { id } = useParams()

  useEffect(() => {
    getData(`products/${id}`).then(response => setProduct(response));
  }, []);

  console.log(product)

  return (
    <div className={cn(s.productPage)}>
      <Header styled />
      <div className={cn('container', s.content)}>
        <div className={s.imgContainer}>
          <div className={s.smallImgBlock}>
            <div className={s.smallImgContainer}>
              <img className={cn(s.smallImg, s.firstImage)} src={product?.Image} alt=""/>
            </div>
            <div className={s.smallImgContainer}>
              <img className={cn(s.smallImg, s.secondImage)} src={product?.Image} alt=""/>
            </div>
            <div className={s.smallImgContainer}>
              <img className={cn(s.smallImg, s.thirdImage)} src={product?.Image} alt=""/>
            </div>
            <div className={s.smallImgContainer}>
              <img className={cn(s.smallImg, s.fourthImage)} src={product?.Image} alt=""/>
            </div>
            <div className={s.smallImgContainer}>
              <img className={cn(s.smallImg, s.fifthImage)} src={product?.Image} alt=""/>
            </div>
          </div>
          <img src={product?.Image} alt={product?.Title}/>
        </div>
        <div className={s.mainInfo}>
          <span className={s.productTitle}>{product?.Title}</span>
          <span className={s.price}>{`${product?.Price} руб`}</span>
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
          <p className={s.description}>{product?.Composition}</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};