import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { AdminAuthRoutingModule } from "./admin-auth-routing.module";
import { AdminAuthComponent } from "./admin-auth.component";

@NgModule({
  declarations: [
    AdminAuthComponent
  ],
  imports: [
    SharedModule,
    AdminAuthRoutingModule
  ]
})
export class AdminAuthModule { }
