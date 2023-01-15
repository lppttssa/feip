import React, {useEffect, useState} from 'react';
import s from './CatalogPage.module.scss'
import cn from "classnames";
import {Header} from "../../components/Header/Header";
import {getData} from "../../requets";
import {Select} from "../../components/ui/Select/Select";
import {Footer} from "../../components/Footer/Footer";
import {CatalogProductCardList} from "../../components/catalogProductCardList/CatalogProductCardList";
import {Pagination} from "../../components/ui/Pagination/Pagination";
import {ProductType} from "../../types";
import {getBrandIdByName} from "../../functions";

export const ITEMS_PER_PAGE = 6;

export const CatalogPage = ():JSX.Element => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getData('brands.json').then(response => setBrands(response));
    getData('/products.json').then(response => setProducts(response));
  }, []);

  useEffect(() => {
    setSortedProducts([...products]);
  }, [products]);

  const handlePaginationClick = (e: any) => {
    setCurrentPage(+e.target.innerText);
  }

  const handlePaginationArrowClick = (step: number) => {
    setCurrentPage(currentPage + step);
  }

  const getProductsPerPage = () => {
    const sliceStart = ITEMS_PER_PAGE * (currentPage - 1);
    return sortedProducts.slice(sliceStart, sliceStart + 6);
  }

  const handleSelectChoose = (chosenOptions: string[]) => {
    setCurrentPage(1);
    if (chosenOptions.length) {
      let currentSortedProducts: ProductType[] = [];
      for (let i = 0; i < chosenOptions.length; i++) {
        const brandId = getBrandIdByName(chosenOptions[i], brands);
        currentSortedProducts = currentSortedProducts.concat(products.filter(item => item.brand === brandId))

      }
      setSortedProducts(currentSortedProducts);
    } else {
      setSortedProducts([...products]);
    }
  }

  return (
    <div className={cn(s.catalogPage)}>
      <Header styled />
      <main className={'container'}>
        <div className={s.selectContainer}>
          <Select
            selectItems={brands}
            selectDefaultTitle='Бренд'
            handleChoose={handleSelectChoose}
          />
        </div>
        <CatalogProductCardList products={getProductsPerPage()} brands={brands} />
        <Pagination
          currentPage={currentPage}
          handleClick={handlePaginationClick}
          handleArrowClick={handlePaginationArrowClick}
          itemsNumber={sortedProducts.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </main>
      <Footer />
    </div>
  );
};
