import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IProductResponse } from '../../interfaces/product/product';
import { ProductService } from '../../services/product/product.service';

@Injectable({ providedIn: 'root' })

export class ProductResolver implements Resolve<IProductResponse> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IProductResponse> {
    return this.productService.getOne(Number(route.paramMap.get('id')));
  }
  
}
