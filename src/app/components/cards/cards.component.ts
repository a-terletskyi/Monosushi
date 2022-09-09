import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  products: IProductResponse[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void { this.loadProducts() }

  loadProducts(): void { this.productService.getAll().subscribe((data) => { this.products = data }) }

}
