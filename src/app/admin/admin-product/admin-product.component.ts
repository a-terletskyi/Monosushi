import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories/categories';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  adminProducts!: IProductResponse[];
  adminCategories!: ICategoryResponse[];

  formAddProduct!: FormGroup;
  addTemplateStatus = false;
  editStatus = false;
  editID!: number;
  uploadPercent!: number;
  isUploaded = false;

  constructor(private productsService: ProductService, private categoriesService: CategoriesService, private fb: FormBuilder, private fireStorage: Storage) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  createForm() {
    this.formAddProduct = this.fb.group({
      category: [null, Validators.required ],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  resetForm(): void {
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.formAddProduct.reset();
  }

  toggleAddTemplate(): void {
    this.resetForm();
    this.addTemplateStatus = !this.addTemplateStatus;
  }

  getAllProducts(): void { this.productsService.getAll().subscribe(data => { this.adminProducts = data }) }
  getAllCategories(): void { this.categoriesService.getAll().subscribe(data => { this.adminCategories = data }) }

  addProducts(): void {
    const newProduct = this.formAddProduct.value;
    this.productsService.create(newProduct).subscribe(() => { this.getAllProducts() });
    this.toggleAddTemplate();
  }

  editProducts(product: IProductResponse): void {
    this.formAddProduct.setValue({
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
    this.addTemplateStatus = true;
  }

  updateProducts(): void {
    const newProduct = this.formAddProduct.value;
    this.productsService.update(this.editID, newProduct).subscribe(() => { this.getAllProducts() });
    this.toggleAddTemplate();
  }

  deleteProducts(product: IProductResponse): void {
    this.productsService.delete(product.id).subscribe(() => {
      this.deleteImage(product.imagePath);
      this.getAllProducts();
    });
  }

// зробити загрузку файлів окремим сервісом

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images/products', file.name, file)
      .then(data => {
        this.formAddProduct.patchValue({ imagePath: data })
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
      this.formAddProduct.patchValue({ imagePath: null })
    }).catch(error => {
      console.log(error)
      this.isUploaded = false;
      this.formAddProduct.patchValue({ imagePath: null })
    })
  }
}
