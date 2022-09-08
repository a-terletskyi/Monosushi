import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories/categories';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})

export class AdminCategoryComponent implements OnInit {
  adminCategories!: ICategoryResponse[];
  categoryForm!: FormGroup;
  templateStatus = false;
  isUploaded = false;
  editStatus = false;
  editID!: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  resetForm(): void {
    this.editStatus = false;
    this.isUploaded = false;
    this.categoryForm.reset();
  }

  toggleTemplateStatus(): void {
    this.templateStatus = !this.templateStatus;
    this.resetForm();
  }

  loadCategories(): void { this.categoryService.getAll().subscribe(data => { this.adminCategories = data }) }

  addCategories(): void {
    const newCategory = this.categoryForm.value;
    this.categoryService.create(newCategory).subscribe(() => { this.loadCategories() });
    this.toggleTemplateStatus();
  }

  editCategories(category: ICategoryResponse): void {
    this.categoryForm.setValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    });
    this.editID = category.id;
    this.editStatus = true;
    this.isUploaded = true;
    this.templateStatus = true;
  }

  updateCategories(): void {
    const newCategory = this.categoryForm.value;
    this.categoryService.update(this.editID, newCategory).subscribe(() => { this.loadCategories() });
    this.toggleTemplateStatus();
  }

  deleteCategories(category: ICategoryResponse): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.deleteImage(category.imagePath);
      this.loadCategories();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images/categories', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({ imagePath: data })
        this.isUploaded = true;
      })
      .catch(error => { console.log(error) });
  }

  deleteImage(imagePath: string): void {
    this.imageService.deleteFile(imagePath).then(() => {
      this.isUploaded = false;
      this.categoryForm.patchValue({ imagePath: null })
    }).catch(error => {
      console.log(error);
      this.isUploaded = false;
      this.categoryForm.patchValue({ imagePath: null })
    })
  }
  
}
