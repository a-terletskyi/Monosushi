import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionResponse } from 'src/app/shared/interfaces/action/action';
@Component({
  selector: 'app-action-details',
  templateUrl: './action-details.component.html',
  styleUrls: ['./action-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionDetailsComponent implements OnInit {
  actionDetails!: IActionResponse;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { this.loadAction() }

  loadAction(): void {
    this.activatedRoute.data.subscribe(response => { this.actionDetails = response['action'] })
  }
  
}
