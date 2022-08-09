import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories/categories';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  adminCategories!: ICategoryResponse[];

  formAddCategory!: FormGroup;
  formTemplateStatus = false;
  editStatus = false;
  editID!: number;

  constructor(private categoryService: CategoriesService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  createForm() {
    this.formAddCategory = this.fb.group({
      name: ['', Validators.required],
      road: ['', Validators.required],
      imagePath: ['', Validators.required]
    });
  }

  toggleTemplate(): void { this.formTemplateStatus ? this.formTemplateStatus = false : this.formTemplateStatus = true }

  getAllCategories(): void { this.categoryService.getAll().subscribe(data => { this.adminCategories = data }) }

  addCategories(): void {
    const newCategory = this.formAddCategory.value;
    this.categoryService.create(newCategory).subscribe(() => { this.getAllCategories() });
    this.formAddCategory.reset();
    this.toggleTemplate();
  }

  editCategories(category: ICategoryResponse): void {
    this.formAddCategory.setValue({
      name: category.name,
      road: category.road,
      imagePath: category.imagePath
    });
    this.editID = category.id;
    this.editStatus = true;
    this.toggleTemplate();
  }

  updateCategories(): void {
    const newCategory = this.formAddCategory.value;
    this.categoryService.update(this.editID, newCategory).subscribe(() => { this.getAllCategories() });
    this.editStatus = false;
    this.formAddCategory.reset();
    this.toggleTemplate();
  }

  deleteCategories(category: ICategoryResponse): void {
    this.categoryService.delete(category.id).subscribe(() => { this.getAllCategories() });
  }
}
