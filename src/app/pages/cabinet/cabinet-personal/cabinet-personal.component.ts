import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cabinet-personal',
  templateUrl: './cabinet-personal.component.html',
  styleUrls: ['./cabinet-personal.component.scss']
})
export class CabinetPersonalComponent implements OnInit {
  personalDataForm!: FormGroup;


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initPersonalDataForm();
  }

  initPersonalDataForm() {
    this.personalDataForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      email: [null, Validators.required],
      typeAddress: [null],
      street: [null],
      houseNumber: [null],
      flatNumber: [null]
    });
  }

  updateData(): void { }

}
