import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})

export class AdminDiscountComponent implements OnInit {
  adminDiscounts!: IDiscountResponse[];
  discountForm!: FormGroup;
  templateStatus = false;
  isUploaded = false;
  editStatus = false;
  editID!: number;

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscounts();
  }

  initDiscountForm() {
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  resetForm(): void {
    this.editStatus = false;
    this.isUploaded = false;
    this.discountForm.reset();
  }

  toggleTemplateStatus(): void {
    this.templateStatus = !this.templateStatus;
    this.resetForm();
  }

  loadDiscounts(): void { this.discountService.getAll().subscribe(data => { this.adminDiscounts = data }) }

  addDiscount(): void {
    const newDiscount = this.discountForm.value;
    newDiscount.date = new Date();
    this.discountService.create(newDiscount).subscribe(() => { this.loadDiscounts() });
    this.toggleTemplateStatus();
  }

  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.setValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath
    });
    this.editID = discount.id;
    this.editStatus = true;
    this.isUploaded = true;
    this.templateStatus = true;
  }

  updateDiscount(): void {
    const newDiscount = this.discountForm.value;
    this.discountService.update(this.editID, newDiscount).subscribe(() => { this.loadDiscounts() });
    this.toggleTemplateStatus();
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.delete(discount.id).subscribe(() => {
      this.deleteImage(discount.imagePath);
      this.loadDiscounts();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images/discounts', file.name, file)
      .then(data => {
        this.discountForm.patchValue({ imagePath: data })
        this.isUploaded = true;
      })
      .catch(error => { console.log(error) });
  }

  deleteImage(imagePath: string): void {
    this.imageService.deleteFile(imagePath).then(()=>{
      this.isUploaded = false;
      this.discountForm.patchValue({ imagePath: null })
    }).catch(error => {
        console.log(error);
        this.isUploaded = false;
        this.discountForm.patchValue({ imagePath: null })
      })
  }

}
