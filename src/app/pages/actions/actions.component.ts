import { Component, OnInit } from '@angular/core';
import { IActionResponse } from 'src/app/shared/interfaces/action/action';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  actions!: IActionResponse[];

  constructor(private actionsServise: ActionService) { }

  ngOnInit(): void {
    this.getAllActions();
  }

  getAllActions(): void { this.actionsServise.getAll().subscribe(data => { this.actions = data }) }
}
