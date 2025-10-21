import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CashFlow } from '../models/cash-flow';
import { authTokenKey } from '../models/user-token';

@Injectable({
  providedIn: 'root',
})
export class CashFlowService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${import.meta.env['NG_APP_PUBLIC_URL']}/api/cashflow`;
  private readonly headers = {
    Authorization: 'Bearer ' + localStorage.getItem(authTokenKey)!,
  };

  getAll(
    description = '',
    minValue = 0,
    maxValue = 0,
    month = 0,
    year = 0,
    status = '',
    type = '',
  ) {
    const params = new HttpParams()
      .set('Description', description || '')
      .set('MinValue', minValue || 0)
      .set('MaxValue', maxValue || 0)
      .set('Month', month || 0)
      .set('Year', year || 0)
      .set('Status', status || '')
      .set('Type', type || '');

    return this.httpClient.get<CashFlow[]>(this.baseUrl, {
      params,
      headers: this.headers,
    });
  }

  create(cashFlow: {
    description: string;
    amount: number;
    type: string;
    status: string;
  }) {
    return this.httpClient.post<CashFlow>(this.baseUrl, cashFlow, {
      headers: this.headers,
    });
  }
}
