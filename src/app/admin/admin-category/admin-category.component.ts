import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  statusAddBtn = false;
  formAddCategory!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  addCategory(): void { this.statusAddBtn ? this.statusAddBtn = false : this.statusAddBtn = true }

  createForm() {
    this.formAddCategory = this.fb.group({
       name: ['', Validators.required ],
       road: ['', Validators.required ],
    });
  }
}
