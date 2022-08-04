import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActionResponse } from 'src/app/shared/interfaces/action/action';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-admin-action',
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.scss']
})
export class AdminActionComponent implements OnInit {
  adminActions!: IActionResponse[];

  formAddAction!: FormGroup;
  formTemplateStatus = false;
  editStatus = false;
  editID!: number;

  constructor(private actionsService: ActionService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getAllActions();
  }

  createForm() {
    this.formAddAction = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      // imagePath
    });
  }

  toggleTemplate(): void { this.formTemplateStatus ? this.formTemplateStatus = false : this.formTemplateStatus = true }

  getAllActions(): void { this.actionsService.getAll().subscribe(data => { this.adminActions = data }) }

  addActions(): void {
    const newAction = this.formAddAction.value;
    newAction.date = new Date();
    this.actionsService.create(newAction).subscribe(() => { this.getAllActions() });
    this.formAddAction.reset();
    this.toggleTemplate();
  }

  editActions(action: IActionResponse): void {
    this.formAddAction.setValue({
      name: action.name,
      title: action.title,
      description: action.description
    });
    this.editID = action.id;
    this.editStatus = true;
    this.toggleTemplate();
  }

  updateActions(): void {
    const newAction = this.formAddAction.value;
    this.actionsService.update(this.editID, newAction).subscribe(() => { this.getAllActions() });
    this.editStatus = false;
    this.formAddAction.reset();
    this.toggleTemplate();
  }

  deleteActions(action: IActionResponse): void {
    this.actionsService.delete(action.id).subscribe(() => { this.getAllActions() });
  }
}
