import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productDetails!: IProductResponse;

  constructor(
    private productServise: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  loadProduct(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productServise.getOne(id).subscribe(data => { this.productDetails = data });
  }

  productCount(product: IProductResponse, status:boolean):void{

  }

  addToBasket(product: IProductResponse):void{

  }

}
