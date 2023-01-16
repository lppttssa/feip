import React, {useEffect, useState} from 'react';
import s from './ProductPage.module.scss';
import {getData} from "../../requets";
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import cn from "classnames";
import {Select} from "../../components/ui/Select/Select";
import {Button} from "../../components/ui/Button/Button";
import {useParams} from 'react-router-dom';
import {useCartState} from "../../context/shopping-cart/Context";
import Loader from "../../components/ui/Loader/Loader";

export const ProductPage = ():JSX.Element => {
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams()

  const {state: {cart}, addItem, removeItem} = useCartState();

  useEffect(() => {
    setLoading(true);
    getData(`products/${id}`).then(response => {setProduct(response); setLoading(false)});
  }, []);

  const handleAdd = () => {
    if (selectedSize) {
      const productSend = {
        sku: product?.Sku,
        title: product?.title,
        price: product?.Price,
        image: product?.Image,
        size: selectedSize,
      };
      isItemInCart() ? removeItem(productSend) : addItem(productSend)
    }
  }

  const isItemInCart = () => {
    return cart.some((item: any) => item.sku === product?.Sku && item.size === selectedSize);
  }

  return (
    <div className={cn(s.productPage)}>
      <Header styled />
      {!isLoading ? <div className={cn('container', s.content)}>
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
              selectItems={['XS', 'S', 'M', 'L']}
              selectDefaultTitle={'Выберите размер'}
              handleChoose={(val) => setSelectedSize(val[0])}
              isOnlyValueSelect
              styled
            />
          </div>
          <Button className={s.btn} onClick={handleAdd} text={isItemInCart() ? 'Удалить' : 'В корзину'} />
          <p className={s.descriptionTitle}>Состав</p>
          <p className={s.description}>{product?.Composition}</p>
        </div>
      </div> : <Loader/>}
      <Footer/>
    </div>
  );
};