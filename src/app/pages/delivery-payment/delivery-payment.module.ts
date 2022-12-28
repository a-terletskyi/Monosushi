import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { DeliveryPaymentRoutingModule } from "./delivery-payment-routing.module";
import { DeliveryPaymentComponent } from "./delivery-payment.component";

@NgModule({
  declarations: [
    DeliveryPaymentComponent
  ],
  imports: [
    SharedModule,
    DeliveryPaymentRoutingModule
  ]
})
export class DeliveryPaymentModule { }
