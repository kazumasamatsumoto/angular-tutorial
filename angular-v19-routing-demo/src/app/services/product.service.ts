import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: '製品A', description: '製品Aの詳細説明', price: 1000 },
    { id: 2, name: '製品B', description: '製品Bの詳細説明', price: 2000 },
    { id: 3, name: '製品C', description: '製品Cの詳細説明', price: 3000 },
    { id: 4, name: '製品D', description: '製品Dの詳細説明', price: 4000 },
    { id: 5, name: '製品E', description: '製品Eの詳細説明', price: 5000 },
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }
}
