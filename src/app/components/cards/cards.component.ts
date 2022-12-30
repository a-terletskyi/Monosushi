import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy {
  public eventSubscription!: Subscription;
  products: IProductResponse[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.loadProducts() }
    })
  }

  ngOnInit(): void { }

  loadProducts(): void {
    let categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    if (categoryName === null) { categoryName = 'roli' }
    this.productService.getAllByCategory(categoryName).subscribe(data => { this.products = data })
  }

  productCount(product: IProductResponse, status: boolean): void {
    if (status) { ++product.count } else if (!status && product.count > 1) { --product.count }
  }

  addToBasket(product: IProductResponse): void { this.orderService.add(product) }

  ngOnDestroy(): void { this.eventSubscription.unsubscribe() }

}
