import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrls: ['./call-dialog.component.scss']
})
export class CallDialogComponent implements OnInit {
  callForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CallDialogComponent>
  ) { }

  ngOnInit(): void {
    this.initCallForm();
  }

  initCallForm() {
    this.callForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/)]]
    });
  }

  sendData(): void {
    const { email, phoneNumber } = this.callForm.value;
    // will need to send data
    this.dialogRef.close();
  }

}
