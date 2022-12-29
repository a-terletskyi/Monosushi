import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { IRegister } from "../../shared/interfaces/account/account";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})

export class AuthDialogComponent implements OnInit, OnDestroy {
  dialogState = 'signIn';
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  forgotPassForm!: FormGroup;
  loginSubscription!: Subscription;
  registerData!: IRegister;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private auth: Auth,
    private afs: Firestore,
    public dialogRef: MatDialogRef<AuthDialogComponent>
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
    this.initForgotPassForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmationPassword: [null, [Validators.required]],
      agreement: [false, [Validators.required]]
    }, { validator: this.passwordValidator })
  }

  initForgotPassForm(): void {
    this.forgotPassForm = this.fb.group({ email: [null, [Validators.required, Validators.email]] })
  }

  passwordValidator(form: FormGroup): { mismatch: boolean } | null {
    return form.value.password === form.value.confirmationPassword ? null : { 'mismatch': true };
  }

  changeDialogState(state: string): void {
    this.dialogState = state;
    this.loginForm.reset();
    this.registerForm.reset();
    this.forgotPassForm.reset();
    this.errorMessage = '';
  }

  loginUser(): void {
    const { email, password } = this.loginForm.value;
    this.login(email, password).then(() => { }).catch(error => { this.errorMessage = error.message })
  }

  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) { this.router.navigate(['/cabinet']) }
      else if (user && user['role'] === ROLE.ADMIN) { this.router.navigate(['/admin']) }
      this.accountService.isAuthorization.next(true);
      this.dialogRef.close();
      this.loginForm.reset();
    }, (error) => { this.errorMessage = error.message })
  }

  registerUser(): void {
    const { email, password } = this.registerForm.value;
    this.register(email, password).then(() => {
      this.dialogState = 'signIn';
      this.registerForm.reset();
    }).catch(error => { this.errorMessage = error.message })
  }

  async register(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    this.registerData = {
      email: this.registerForm.value.email,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      phoneNumber: this.registerForm.value.phoneNumber,
      address: '',
      orders: [],
      role: ROLE.USER
    };
    await setDoc(doc(this.afs, 'users', credential.user.uid), this.registerData);
  }

  forgotPass(): void {
    // will need to send data;
  }

  ngOnDestroy(): void { this.loginSubscription?.unsubscribe() }

}
