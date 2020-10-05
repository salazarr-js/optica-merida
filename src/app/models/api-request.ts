import { HttpHeaders, HttpParams } from '@angular/common/http';

/** HTTP CLIENT OPTIONS MODEL */
export interface ApiRequestOptions {
  /** TYPE RESPONSE WILL RETURN THE SERVER */
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' | string | any;

  /** REQUEST HEADERS */
  headers?: HttpHeaders | {[key: string]: string };

  /** REQUEST QUERY PARAMS */
  params?: HttpParams;

  /** OPTIONAL PARAMS */
  [key: string]: any;
}
