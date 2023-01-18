import { Injectable } from '@angular/core';

// THIRDs
import { Functions, httpsCallable } from '@angular/fire/functions'
// MODELS
import { Product } from '@models/product';

// SERVICES

/** */
export interface MailBody {
  to: string
  name: string
  total: number
  products: Product[]
}

/** EMAIL APISERVICE */
@Injectable()
export class EmailApiService {

  /** CREATE INSTANCE */
  constructor(private functions: Functions) {
  }

  /** SEND INVOICE MAIL*/
  // sendInvoiceEmail(body: any): Observable<ApiResponse> {
  sendInvoiceEmail(body: MailBody) {
    const fireSendEmail = httpsCallable(this.functions, 'sendMail')

    fireSendEmail(body)
      .then(data => {
        console.warn('fireSendEmail:SUCCESS', data)
      }).catch(error => console.warn('fireSendEmail:ERROR', error))
  }
}

