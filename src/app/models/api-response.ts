
/** API RESPONSE WITH PAGINATION LINKS */
export interface ApiPaginationLinksResponse {
  /** FIRST PAGINATION LINK */
  first?: string;

  /** LAST PAGINATION LINK */
  last?: string;

  /** PREV PAGINATION LINK */
  prev?: string;

  /** NEXT PAGINATION LINK */
  next?: string;

  /** OPTIONAL KEY VALUES */
  [key: string]: any;
}

/** API RESPONSE MODEL */
export interface ApiResponse {
  /** RESPONSE DATA */
  data?: any;

  /** RESPONSE PAGINATION */
  links?: Array<ApiPaginationLinksResponse>;

  /** EXTRA RESPONSE META DATA */
  meta?: {[key: string]: any};

  /** OPTIONAL KEY VALUES */
  [key: string]: any;
}
