export type BrandType = {
  id: number,
  code: string,
  sort: string,
  title: string,
}

export type ProductType = {
  ID: number,
  type: string,
  Sku: string,
  Title: string,
  Price: number,
  Image: string,
  brand: number,
}

export type ProductCartType = {
  sku: string,
  title: string,
  price: number,
  image: string,
}

export type CartType =  ProductCartType & {quantity: number};

export type CartContextType = {
  state: CartStateType,
  addItem: (params: ProductCartType) => void,
  removeItem: (params: ProductCartType) => void,
  changeQuantity: (params: ProductCartType, step: number) => void,
  clearCart: () => void,
}

export type CartActionsType =
    {type: 'ADD_TO_CART'} & {item: ProductCartType} |
    {type: 'REMOVE_FROM_CART'} & {item: ProductCartType} |
    {type: 'CHANGE_QUANTITY'} & {item: ProductCartType} & {step:number} |
    {type: 'CLEAR_CART'};

export type CartStateType = {
  cart: CartType[],
}