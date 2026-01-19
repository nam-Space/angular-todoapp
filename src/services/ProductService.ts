import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../app/shared/types/product';
import { environment as env } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<any>(`${env.apiUrl}/product`);
  }

  getDetailProduct(id: string) {
    return this.http.get<any>(`${env.apiUrl}/product/${id}`);
  }

  addProduct(data: IProduct) {
    return this.http.post<any>(`${env.apiUrl}/product`, { ...data });
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(`${env.apiUrl}/product/${id}`);
  }

  updateProduct(id: string, data: IProduct) {
    return this.http.put<any>(`${env.apiUrl}/product/${id}`, {
      ...data,
    });
  }
}
