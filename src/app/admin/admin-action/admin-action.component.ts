import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActionResponse } from 'src/app/shared/interfaces/action/action';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-action',
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.scss']
})

export class AdminActionComponent implements OnInit {
  adminActions!: IActionResponse[];
  actionForm!: FormGroup;
  templateStatus = false;
  isUploaded = false;
  editStatus = false;
  editID!: number;

  constructor(
    private fb: FormBuilder,
    private actionsService: ActionService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.initActionForm();
    this.loadActions();
  }

  initActionForm() {
    this.actionForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  resetForm(): void {
    this.editStatus = false;
    this.isUploaded = false;
    this.actionForm.reset();
  }

  toggleTemplateStatus(): void {
    this.templateStatus = !this.templateStatus;
    this.resetForm();
  }

  loadActions(): void { this.actionsService.getAll().subscribe(data => { this.adminActions = data }) }

  addActions(): void {
    const newAction = this.actionForm.value;
    newAction.date = new Date();
    this.actionsService.create(newAction).subscribe(() => { this.loadActions() });
    this.toggleTemplateStatus();
  }

  editActions(action: IActionResponse): void {
    this.actionForm.setValue({
      name: action.name,
      title: action.title,
      description: action.description,
      imagePath: action.imagePath
    });
    this.editID = action.id;
    this.editStatus = true;
    this.isUploaded = true;
    this.templateStatus = true;
  }

  updateActions(): void {
    const newAction = this.actionForm.value;
    this.actionsService.update(this.editID, newAction).subscribe(() => { this.loadActions() });
    this.toggleTemplateStatus();
  }

  deleteActions(action: IActionResponse): void {
    this.actionsService.delete(action.id).subscribe(() => {
      this.deleteImage(action.imagePath);
      this.loadActions();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images/actions', file.name, file)
      .then(data => {
        this.actionForm.patchValue({ imagePath: data })
        this.isUploaded = true;
      })
      .catch(error => { console.log(error) });
  }

  deleteImage(imagePath: string): void {
    this.imageService.deleteFile(imagePath).then(()=>{
      this.isUploaded = false;
      this.actionForm.patchValue({ imagePath: null })
    }).catch(error => {
        console.log(error);
        this.isUploaded = false;
        this.actionForm.patchValue({ imagePath: null })
      })
  }
  
}
