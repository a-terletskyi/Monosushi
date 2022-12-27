import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount';
@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DiscountInfoComponent implements OnInit {
  discountDetails!: IDiscountResponse;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { this.loadDiscount() }

  loadDiscount(): void {
    this.activatedRoute.data.subscribe(response => { this.discountDetails = response['discount'] })
  }

}
