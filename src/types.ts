export type BrandType = {
  id: number,
  code: string,
  sort: string,
  title: string,
}

export type ProductType = {
  id: number,
  type: string,
  sku: string,
  title: string,
  price: {
    currency: string,
    value: number,
  },
  image: string,
  brand: number,
}

export type PriceType = {
  currency: string,
  value: number,
}

export type ProductCartType = {
  sku: string,
  title: string,
  price: {
    currency: string,
    value: number,
  },
  image: string,
}

export type CartType =  ProductCartType & {quantity: number};

export type CartContextType = {
  state: CartStateType,
  addItem: (params: ProductCartType) => void,
  removeItem: (params: ProductCartType) => void,
  changeQuantity: (params: ProductCartType, step: number) => void,
}

export type CartActionsType =
    {type: 'ADD_TO_CART'} & {item: ProductCartType} |
    {type: 'REMOVE_FROM_CART'} & {item: ProductCartType} |
    {type: 'CHANGE_QUANTITY'} & {item: ProductCartType} & {step:number};

export type CartStateType = {
  cart: CartType[],
}