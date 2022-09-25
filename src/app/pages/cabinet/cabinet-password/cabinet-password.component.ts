import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cabinet-password',
  templateUrl: './cabinet-password.component.html',
  styleUrls: ['./cabinet-password.component.scss']
})
export class CabinetPasswordComponent implements OnInit {
  passwordForm!:FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initPasswordForm();
  }

  initPasswordForm():void{
    this.passwordForm = this.fb.group({
      currentPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      againNewPassword: [null, Validators.required],
    });
  }

  updateData(): void { }

}
