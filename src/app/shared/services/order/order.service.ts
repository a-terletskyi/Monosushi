import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProductResponse } from '../../interfaces/product/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  changeBasket = new Subject<boolean>();

  constructor() { }

  add(product: IProductResponse): void {
    let basket: IProductResponse[] = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else { basket.push(product); }
    } else { basket.push(product); }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.changeBasket.next(true);
  }
  
}
