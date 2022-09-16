import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productDetails!: IProductResponse;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { this.loadProduct() }

  loadProduct(): void {
    this.activatedRoute.data.subscribe(response => { this.productDetails = response['product'] })
  }

  productCount(product: IProductResponse, status: boolean): void {
    if (status) { ++product.count } else if (!status && product.count > 1) { --product.count }
  }

  addToBasket(product: IProductResponse): void { this.orderService.add(product) }

}
