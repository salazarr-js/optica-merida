/** PRODUCT TYPES */
export enum ProductTypes {
  frame   = 'armazon',
  contact = 'contacto',
  sun     = 'sol'
}

/** GENDERS */
export enum Genders {
  male   = 'm',
  female = 'f',
  unisex = 'u'
}

/** PRODUCT SUB-TYPES */
export enum ProductSubTypes {
  // SUN & FRAME
  aviador = 'Aviador',
  catEye = 'Cat Eye',
  cuadrado = 'Cuadrado',
  deportivo = 'Deportivo',
  rectangular = 'Rectangular',
  redondo = 'Redondo',
  // CONTACT
  esferico = 'Esférico',
  torico = 'Tórico',
  estetico = 'Estético',
}

/** PRODUCT COLORS */
export enum ProductColors {
  negro = 'Negro',
  dorado = 'Dorado',
  havana = 'Havana',
}

/** PRODUCT MODEL */
export interface Product {
  id?: number;
  cod: string;
  description: string;
  brand: string;
  type: ProductTypes;
  price: number;
  stock: number;

  discount: number;
  gender: Genders;
  subtype: ProductSubTypes;
  color: string;

  images: string[];

  url?: string;
}

/** CART PRODUCT MODEL */
export interface CartProduct {
  id: number;
  amount: number
}