import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProductResponse } from '../../interfaces/product/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  basket: IProductResponse[] = [];
  changeBasket = new Subject<boolean>();

  constructor() { }

  add(product: IProductResponse): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      if (this.basket.some(prod => prod.id === product.id)) {
        const index = this.basket.findIndex(prod => prod.id === product.id);
        this.basket[index].count = product.count;
      } else { this.basket.push(product); }
    } else { this.basket.push(product); }
    localStorage.setItem('basket', JSON.stringify(this.basket));
    product.count = 1;
    this.changeBasket.next(true);
  }

  delete(product: IProductResponse): void {
    this.basket = JSON.parse(localStorage.getItem('basket') as string);
    if (this.basket.some(prod => prod.id === product.id)) {
      const index = this.basket.findIndex(prod => prod.id === product.id);
      this.basket.splice(index, 1);
    }
    localStorage.setItem('basket', JSON.stringify(this.basket));
    product.count = 1;
    this.changeBasket.next(true);
  }

}
