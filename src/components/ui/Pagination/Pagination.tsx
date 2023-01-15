import React, {useEffect, useState} from 'react';
import s from './Pagination.module.scss'
import ArrowIcon from "../icons/ArrowIcon";
import cn from "classnames";

type PaginationProps = {
  itemsNumber: number,
  itemsPerPage: number,
  handleClick: (e: any) => void,
  currentPage: number,
  handleArrowClick: (step: number) => void,
};

export const Pagination = (props: PaginationProps) => {
  const {
    itemsNumber, itemsPerPage, handleClick, currentPage, handleArrowClick
  } = props;
  const [pagesNumber, setPagesNumber] = useState(Math.ceil(itemsNumber / itemsPerPage))

  useEffect(() => {
    setPagesNumber(Math.ceil(itemsNumber / itemsPerPage));
  }, [itemsNumber, itemsPerPage])


  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= pagesNumber; i++) {
      pages.push(i);
    }
    return pages;
  }

  const handleForwardClick = () => {
    if (currentPage < pagesNumber) {
      handleArrowClick(1);
    }
  }

  const handleBackClick = () => {
    if (currentPage > 1) {
      handleArrowClick(-1);
    }
  }

  return (
    <div className={cn(s.pagination, { [s.hidden]: pagesNumber === 1 })}>
      <div
        className={cn(s.arrowContainer, s.arrowLeftContainer, { [s.disabled]: currentPage === 1 })}
        onClick={handleBackClick}
      >
        <ArrowIcon className={cn(s.arrow, s.arrowLeft)} />
        <ArrowIcon className={cn(s.arrow, s.arrowLeft)} />
      </div>

      {getPages().map((item) => (
        <span className={cn(s.paginationItem, { [s.active]: currentPage === item })} key={item} onClick={handleClick}>
          {item}
        </span>
      ))}
      <div
        className={cn(s.arrowContainer, { [s.disabled]: pagesNumber === currentPage })}
        onClick={handleForwardClick}
      >
        <ArrowIcon className={cn(s.arrow, s.arrowRight)} />
        <ArrowIcon className={cn(s.arrow, s.arrowRight)} />
      </div>
    </div>
  );
};