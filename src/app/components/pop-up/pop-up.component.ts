import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  popUpName = '';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private headerComponent: HeaderComponent
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  openModalByName(name: string): void { this.popUpName = name }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  login(): void {
    this.accountService.login(this.loginForm.value).subscribe(data => {
      if (data.length > 0) {
        const user = data[0];
        if (user && user.role === ROLE.USER) { this.router.navigate(['/kabinet']) }
        else if (user && user.role === ROLE.ADMIN) { this.router.navigate(['/admin']) }
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.accountService.isAuthorizated.next(true);
        this.headerComponent.currentPopUp.hide();
      }
    }, (error) => { console.log(error) })
  }

}

