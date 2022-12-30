import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetPersonalComponent } from './cabinet-personal.component';
import { ReactiveFormsModule } from "@angular/forms";

describe('CabinetPersonalComponent', () => {
  let component: CabinetPersonalComponent;
  let fixture: ComponentFixture<CabinetPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetPersonalComponent ],
      imports: [
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
