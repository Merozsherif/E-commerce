import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }
  createNewCart(modal: any) {
    return this.http.post(environment.baseApi + 'carts', modal)
  }
}
