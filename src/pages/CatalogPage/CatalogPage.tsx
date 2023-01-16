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
import {Link, useParams} from "react-router-dom"

export const ITEMS_PER_PAGE = 6;

export const CatalogPage = ():JSX.Element => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getData(`categories/${id}`);
    } else {
      getData('products').then(response => setProducts(response));
    }
    getData('categories').then(response => setCategories(response));
  }, []);

  useEffect(() => {
    if (id) {
      //@ts-ignore
      getData(`categories/${id}`).then(response => setProducts(response));
    } else {
      getData('products').then(response => setProducts(response));
    }
  }, [id])

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

  console.log(id)
  console.log(categories)
  return (
    <div className={cn(s.catalogPage)}>
      <Header styled />
      <main className={'container'}>
        <div className={s.topBlock}>
          <h3 className={s.pageTitle}>Каталог</h3>
          <div className={s.selectContainer}>
            <Select
                selectItems={brands}
                selectDefaultTitle='Бренд'
                handleChoose={handleSelectChoose}
            />
          </div>
        </div>
        <div className={s.mainContent}>
          <ul className={cn('list-reset', s.categories)}>
            {categories.map((item: any) => (
              <li className={s.categoriesItem}>
                <Link to={`/catalog/${item.ID}`} className={cn(s.link, { [s.active]: item.ID.toString() === id })}>
                  {item?.Name}
                </Link>
              </li>
            ))}
          </ul>
          <CatalogProductCardList products={getProductsPerPage()} brands={brands} />
        </div>
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
