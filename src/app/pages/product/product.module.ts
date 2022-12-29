import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductInfoComponent } from "./product-info/product-info.component";
import { ProductComponent } from "./product.component";
@NgModule({
  declarations: [
    ProductInfoComponent,
    ProductComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
