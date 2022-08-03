import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-action',
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.scss']
})
export class AdminActionComponent implements OnInit {
  statusAddBtn = false;
  formAddAction!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  addAction(): void { this.statusAddBtn ? this.statusAddBtn = false : this.statusAddBtn = true }

  createForm() {
    this.formAddAction = this.fb.group({
       name: ['', Validators.required ],
       title: ['', Validators.required ],
       description: ['', Validators.required ],
    });
  }
}
