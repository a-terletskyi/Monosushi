import { Component, OnInit } from '@angular/core';
import { IActionResponse } from 'src/app/shared/interfaces/action/action';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-action-details',
  templateUrl: './action-details.component.html',
  styleUrls: ['./action-details.component.scss']
})
export class ActionDetailsComponent implements OnInit {

  constructor(private actionsServise: ActionService) { }

  ngOnInit(): void {
  }

  getAction(action: IActionResponse): void {
    
  }

}
