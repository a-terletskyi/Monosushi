import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { DiscountRoutingModule } from "./discount-routing.module";
import { DiscountComponent } from "./discount.component";
import { DiscountInfoComponent } from "./discount-info/discount-info.component";
@NgModule({
  declarations: [
    DiscountComponent,
    DiscountInfoComponent
  ],
  imports: [
    SharedModule,
    DiscountRoutingModule
  ]
})
export class DiscountModule { }
