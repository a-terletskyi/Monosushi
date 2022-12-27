import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  discounts!: IDiscountResponse[];

  constructor(private discountService: DiscountService) { }

  ngOnInit(): void { this.loadDiscounts() }

  loadDiscounts(): void { this.discountService.getAll().subscribe(data => { this.discounts = data }) }
}
