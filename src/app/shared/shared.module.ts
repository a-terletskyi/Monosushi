import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { CardsComponent } from "../components/cards/cards.component";
import { CategoriesTabsComponent } from "../components/categories-tabs/categories-tabs.component";

// material
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

const MATERIAL = [
    MatDialogModule,
    MatInputModule,
]

@NgModule({
    declarations: [
      CardsComponent,
      CategoriesTabsComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL,
  ],
    exports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      CardsComponent,
      CategoriesTabsComponent,
      ...MATERIAL,
    ]
})

export class SharedModule { }
