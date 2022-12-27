import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IDiscountResponse } from '../../interfaces/discount/discount';
import { DiscountService } from '../../services/discount/discount.service';

@Injectable({ providedIn: 'root' })

export class DiscountResolver implements Resolve<IDiscountResponse> {

  constructor(private discountService: DiscountService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IDiscountResponse> {
    return this.discountService.getOne(Number(route.paramMap.get('id')));
  }

}
