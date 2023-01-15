import {BrandType} from "./types";

export const getBrandNameById = (id: number, brands: BrandType[]):string => {
  return brands.find((item) => item.id === id)?.title || '';
}

export const getBrandIdByName = (title: string, brands: BrandType[]): number => {
  return brands.find((item) => item.title === title)?.id || 0;
}