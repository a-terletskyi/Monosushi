import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetComponent } from './cabinet.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";

describe('CabinetComponent', () => {
  let component: CabinetComponent;
  let fixture: ComponentFixture<CabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
