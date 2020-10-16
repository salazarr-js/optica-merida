import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// THIRDs
import { Observable } from 'rxjs';
// MODELS
import { ApiResponse } from '@models/api-response';
import { environment as env }  from '@env/environment';
// SERVICES
 
/** EMAIL APISERVICE */
@Injectable()
export class EmailApiService {

  /** CREATE INSTANCE */
  constructor(private http: HttpClient) {

  }

  /** SEND INVOICE MAIL*/
  sendInvoiceEmail(body: any): Observable<ApiResponse> {
    return this.http.post(`${env.emailUrl}send-invoice-email`, body);
  }
}

