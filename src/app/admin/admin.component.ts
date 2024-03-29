import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/services/account/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  logOut(): void { this.accountService.logOut() }

}
