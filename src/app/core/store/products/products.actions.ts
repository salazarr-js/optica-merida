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

/** SET/SAVE SEARCH TEXT TO STATE */
export class SetSearchText {
  public static readonly type = '[Products] Set SearchText';
  constructor(public searchText: string) {}
}

/** SET/REMOVE SEARCH TEXT TO STATE */
export class RemoveSearchText {
  public static readonly type = '[Products] Remove SearchText';
}

/** SET/SAVE SEARCHABLE TO STATE */
export class SetSearchable {
  public static readonly type = '[Products] Set Searchable';
  constructor(public searchable: boolean) {}
}
