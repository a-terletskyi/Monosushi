import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss']
})

export class BasketDialogComponent implements OnInit {
  basketProducts: IProductResponse[] = [];
  totalPrice = 0;
  totalCount = 0;

  constructor(
    private orderService: OrderService,
    public dialogRef: MatDialogRef<BasketDialogComponent>
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basketProducts = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  updateBasket(): void { this.orderService.changeBasket.subscribe(() => { this.loadBasket() }) }

  deleteToBasket(product: IProductResponse): void { this.orderService.delete(product) }

  getTotalPrice(): void { this.totalPrice = this.basketProducts.reduce((total: number, prod: IProductResponse) => total + prod.price * prod.count, 0) }

  getTotalCount(): void { this.totalCount = this.basketProducts.reduce((total: number, prod: IProductResponse) => total + prod.count, 0) }

  productCount(product: IProductResponse, status: boolean): void {
    if (status) {
      ++product.count;
      this.orderService.add(product);
    } else if (!status && product.count > 1) {
      --product.count;
      this.orderService.add(product);
    }
  }

}
