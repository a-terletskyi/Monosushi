import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

const MATERIAL = [
    MatDialogModule,
    MatInputModule
]

// other modals
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [],
    imports: [
      ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    exports: [
      ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ]
})

export class SharedModule { }
