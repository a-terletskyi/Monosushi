import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionResponse } from 'src/app/shared/interfaces/action/action';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-action-details',
  templateUrl: './action-details.component.html',
  styleUrls: ['./action-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionDetailsComponent implements OnInit {
  actionDetails: IActionResponse = { id: 1, date: new Date(), name: '', title: '', description: '', imagePath: '' };

  constructor(private actionsServise: ActionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { this.loadAction() }

  loadAction(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.actionsServise.getOne(id).subscribe(data => { this.actionDetails = data });
  }
}
