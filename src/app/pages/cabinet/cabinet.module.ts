import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { CabinetRoutingModule } from "./cabinet-routing.module";
import { CabinetComponent } from './cabinet.component';
import { CabinetPersonalComponent } from './cabinet-personal/cabinet-personal.component';
import { CabinetHistoryComponent } from './cabinet-history/cabinet-history.component';
import { CabinetPasswordComponent } from './cabinet-password/cabinet-password.component';


@NgModule({
  declarations: [
    CabinetComponent,
    CabinetPersonalComponent,
    CabinetHistoryComponent,
    CabinetPasswordComponent
  ],
  imports: [
    SharedModule,
    CabinetRoutingModule
  ]
})
export class CabinetModule { }
