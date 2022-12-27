import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  adminProducts!: IProductResponse[];
  adminCategories!: ICategoryResponse[];
  productForm!: FormGroup;
  templateStatus = false;
  isUploaded = false;
  editStatus = false;
  editID!: number;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductService,
    private categoriesService: CategoryService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadProducts();
    this.loadCategories();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  resetForm(): void {
    this.editStatus = false;
    this.isUploaded = false;
    this.productForm.reset({ count: 1 });
  }

  toggleTemplateStatus(): void {
    this.templateStatus = !this.templateStatus;
    this.resetForm();
  }

  loadProducts(): void { this.productsService.getAll().subscribe(data => { this.adminProducts = data }) }
  loadCategories(): void { this.categoriesService.getAll().subscribe(data => { this.adminCategories = data }) }

  addProducts(): void {
    const newProduct = this.productForm.value;
    this.productsService.create(newProduct).subscribe(() => { this.loadProducts() });
    this.toggleTemplateStatus();
  }

  editProducts(product: IProductResponse): void {

    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath
    });
    this.editID = product.id;
    this.editStatus = true;
    this.isUploaded = true;
    this.templateStatus = true;
  }

  updateProducts(): void {
    const newProduct = this.productForm.value;
    this.productsService.update(this.editID, newProduct).subscribe(() => { this.loadProducts() });
    this.toggleTemplateStatus();
  }

  deleteProducts(product: IProductResponse): void {
    this.productsService.delete(product.id).subscribe(() => {
      this.deleteImage(product.imagePath);
      this.loadProducts();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images/products', file.name, file)
      .then(data => {
        this.productForm.patchValue({ imagePath: data })
        this.isUploaded = true;
      })
      .catch(error => { console.log(error) });
  }

  deleteImage(imagePath: string): void {
    this.imageService.deleteFile(imagePath).then(() => {
      this.isUploaded = false;
      this.productForm.patchValue({ imagePath: null })
    }).catch(error => {
      console.log(error);
      this.isUploaded = false;
      this.productForm.patchValue({ imagePath: null })
    })
  }

}
