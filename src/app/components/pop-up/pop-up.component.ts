import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit, OnDestroy {
  popUpName = '';
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loginSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private auth: Auth,
    private afs: Firestore,
    private headerComponent: HeaderComponent
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
  }

  openModalByName(name: string): void { this.popUpName = name }

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
      phoneNumber: [null, [Validators.required]], // add pattern for phone number (regExp) + email errors
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      checkBox: [false, [Validators.required]]
    }, { validator: this.passwordValidator })
  }

  passwordValidator(form: FormGroup): { mismatch: boolean } | null {
      return form.value.password === form.value.confirmPassword ? null : {'mismatch': true};
  }

  loginUser(): void {
    const { email, password } = this.loginForm.value;
    this.login(email, password).then(() => {
      console.log('login done'); // add toster
    }).catch(error => { console.log('login error', error) })
  }

  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      // Помилка, в змінну юзер формується масив а не один юзер
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) { this.router.navigate(['/kabinet']) }
      else if (user && user['role'] === ROLE.ADMIN) { this.router.navigate(['/admin']) }
      this.accountService.isAuthorizated.next(true);
      this.headerComponent.currentPopUp.hide();
      this.loginForm.reset();
    }, (error) => { console.log('error', error) })
  }

  registerUser(): void {
    const { email, password } = this.registerForm.value;
    this.register(email, password).then(() => {
      console.log('user created'); // add toster
    }).catch(error => { console.log('register error', error) })
  }

  async register(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    // const newUser = {
    //   email: credential.user.email,
    //   firstName: credential.user.firstName,
    //   lastName: credential.user.lastName,
    //   phoneNumber: credential.user.phoneNumber,
    //   address: '',
    //   orders: [],
    //   role: ROLE.USER
    // };
    // setDoc(doc(this.afs, 'users', credential.user.uid), newUser);
    this.popUpName = 'signIn';
    this.registerForm.reset();
  }

  ngOnDestroy(): void { this.loginSubscription.unsubscribe() }

}

