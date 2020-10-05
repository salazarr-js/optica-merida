import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiResponse } from '@models/api-response';
import { ApiRequestOptions } from '@models/api-request';

import { environment as env } from '@env/environment';

/** API SERVICES - REPOSITORY PATTERN */
@Injectable()
export class ApiService {
  /** HTTP CLIENT WRAPPER */
  constructor(private http: HttpClient) {}

  /** GET REQUEST TO API TO GET RESOURCES */
  get(url: string, options: ApiRequestOptions = {}): Observable<ApiResponse> {
    return this.http.get(`${env.apiUrl}${url}`, this.parseOptions(options));
  }

  /** PUT REQUEST TO API TO UPDATE RESOURCES */
  put(url: string, body: object = {}, options: ApiRequestOptions = {}): Observable<ApiResponse> {
    return this.http.put(`${env.apiUrl}${url}`, body, this.parseOptions(options));
  }

  /** POST REQUEST TO API TO CREATE RESOURCES */
  post(url: string, body: object = {}, options: ApiRequestOptions = {}): Observable<ApiResponse> {
    return this.http.post(`${env.apiUrl}${url}`, body, this.parseOptions(options));
  }

  /** DELETE REQUEST TO API TO DELETE RESOURCES */
  delete(url: string, options: ApiRequestOptions = {}): Observable<ApiResponse> {
    return this.http.delete(`${env.apiUrl}${url}`, this.parseOptions(options));
  }

  /** RETURN REQUEST OPTIONS MERGED WITH DEFAULTS */
  private parseOptions(options: ApiRequestOptions): ApiRequestOptions {
    const defaultOpts = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return { ...defaultOpts, ...options };
  }
}
