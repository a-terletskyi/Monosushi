import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { AdminDiscountComponent } from "./admin-discount/admin-discount.component";
import { AdminCategoryComponent } from "./admin-category/admin-category.component";
import { AdminProductComponent } from "./admin-product/admin-product.component";
import { AdminOrderComponent } from "./admin-order/admin-order.component";

@NgModule({
  declarations: [
    AdminComponent,
    AdminDiscountComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrderComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
