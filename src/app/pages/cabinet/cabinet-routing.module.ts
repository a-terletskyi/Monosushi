import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CabinetComponent } from './cabinet.component';
import { CabinetPersonalComponent } from './cabinet-personal/cabinet-personal.component';
import { CabinetHistoryComponent } from './cabinet-history/cabinet-history.component';
import { CabinetPasswordComponent } from './cabinet-password/cabinet-password.component';

const routes: Routes = [
  {path: '', component: CabinetComponent, children: [
      { path: 'personal-data', component: CabinetPersonalComponent },
      { path: 'history', component: CabinetHistoryComponent },
      { path: 'password', component: CabinetPasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'personal-data' }
    ]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
