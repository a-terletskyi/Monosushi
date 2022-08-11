import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories/categories';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  adminCategories!: ICategoryResponse[];

  formAddCategory!: FormGroup;
  addTemplateStatus = false;
  editStatus = false;
  editID!: number;
  uploadPercent!: number;
  isUploaded = false;

  constructor(private categoryService: CategoriesService, private fb: FormBuilder, private fireStorage: Storage) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  createForm() {
    this.formAddCategory = this.fb.group({
      name: ['', Validators.required],
      road: ['', Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  resetForm(): void {
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.formAddCategory.reset();
  }

  toggleAddTemplate(): void {
    this.resetForm();
    this.addTemplateStatus ? this.addTemplateStatus = false : this.addTemplateStatus = true
  }

  getAllCategories(): void { this.categoryService.getAll().subscribe(data => { this.adminCategories = data }) }

  addCategories(): void {
    const newCategory = this.formAddCategory.value;
    this.categoryService.create(newCategory).subscribe(() => { this.getAllCategories() });
    this.toggleAddTemplate();
  }

  editCategories(category: ICategoryResponse): void {
    this.formAddCategory.setValue({
      name: category.name,
      road: category.road,
      imagePath: category.imagePath
    });
    this.editID = category.id;
    this.editStatus = true;
    this.isUploaded = true;
    this.addTemplateStatus = true;
  }

  updateCategories(): void {
    const newCategory = this.formAddCategory.value;
    this.categoryService.update(this.editID, newCategory).subscribe(() => { this.getAllCategories() });
    this.toggleAddTemplate();
  }

  deleteCategories(category: ICategoryResponse): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.deleteImage(category.imagePath);
      this.getAllCategories()
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images/categories', file.name, file)
      .then(data => {
        this.formAddCategory.patchValue({ imagePath: data })
        this.isUploaded = true;
      })
      .catch(error => { console.log(error) });
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.fireStorage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => { this.uploadPercent = data.progress });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (error: any) { console.error(error) }
    } else { console.log('Wrong format') }
    return Promise.resolve(url);
  }

  deleteImage(imageUrl: string): void {
    const task = ref(this.fireStorage, imageUrl);
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.formAddCategory.patchValue({ imagePath: null })
    }).catch(error => {
      console.log(error)
      this.isUploaded = false;
      this.formAddCategory.patchValue({ imagePath: null })
    })
  }
}
