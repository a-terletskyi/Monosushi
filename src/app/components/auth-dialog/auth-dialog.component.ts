import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})

export class AuthDialogComponent implements OnInit, OnDestroy {
  dialogState = 'signIn';
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loginSubscription!: Subscription;

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
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      checkBox: [false, [Validators.required]]
    }, { validator: this.passwordValidator })
  }

  passwordValidator(form: FormGroup): { mismatch: boolean } | null {
    return form.value.password === form.value.confirmPassword ? null : { 'mismatch': true };
  }

  loginUser(): void {
    const { email, password } = this.loginForm.value;
    this.login(email, password).then(() => {
      console.log('login done'); // add toster
    }).catch(error => { console.log('login error', error) }) // add toster
  }

  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) { this.router.navigate(['/kabinet']) }
      else if (user && user['role'] === ROLE.ADMIN) { this.router.navigate(['/admin']) }
      this.accountService.isAuthorizated.next(true);
      this.dialogRef.close();
      this.loginForm.reset();
    }, (error) => { console.log('error', error) }) // add toster
  }

  registerUser(): void {
    const { email, password } = this.registerForm.value;
    this.register(email, password).then(() => {
      console.log('user created'); // add toster
      this.dialogState = 'signIn';
      this.registerForm.reset();
    }).catch(error => { console.log('register error', error) }) // add toster
  }

  async register(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const newUser = {
      email: credential.user.email,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      phoneNumber: this.registerForm.value.phoneNumber,
      address: '',
      orders: [],
      role: ROLE.USER
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), newUser);
  }

  closeDialog(): void { this.dialogRef.close() }

  ngOnDestroy(): void { this.loginSubscription?.unsubscribe() }

}
