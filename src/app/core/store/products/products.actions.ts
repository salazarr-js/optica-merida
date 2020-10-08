import { Product, ProductTypes } from '@models/product';

/** GET/REQUEST PRODUCTS WITH DETAILS FROM API */
export class GetAllProducts {
  public static readonly type = '[Products] Get';
}

/** SET/SAVE PRODUCTS WITH DETAILS TO STATE */
export class SetProducts {
  public static readonly type = '[Products] Set';
  constructor(public products: Product[]) {}
}

/** SET/SAVE TYPE FILTER TO STATE */
export class SetTypeFilter {
  public static readonly type = '[Products] Set TypeFilter';
  constructor(public typeFilter: ProductTypes) {}
}

/** SET/REMOVE TYPE FILTER TO STATE */
export class RemoveTypeFilter {
  public static readonly type = '[Products] Remove TypeFilter';
}
