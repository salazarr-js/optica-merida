/** TYPES */
export enum ProductTypes {
  frame   = 'armazon',
  contact = 'contacto',
  sun     = 'sol'
}

export enum Genders {
  male   = 'm',
  female = 'f',
  unisex = 'u'
}

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

export enum ProductColor {
  negro = 'Negro',
  dorado = 'Dorado',
  havana = 'Havana',
}


/** MODELS */
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
}