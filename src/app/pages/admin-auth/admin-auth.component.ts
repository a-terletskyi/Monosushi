import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent implements OnInit {
  adminLoginForm!: FormGroup;
  loginSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private auth: Auth,
    private afs: Firestore,
    ) { }

  ngOnInit(): void {
    this.initAdminLoginForm();
  }

  initAdminLoginForm() {
    this.adminLoginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  loginAdmin(): void {
    const { email, password } = this.adminLoginForm.value;
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
      this.adminLoginForm.reset();
    }, (error) => { console.log('error', error) }) // add toster
  }

  ngOnDestroy(): void { this.loginSubscription?.unsubscribe() }

}
