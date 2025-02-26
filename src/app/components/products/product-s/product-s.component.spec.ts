import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSComponent } from './product-s.component';

describe('ProductSComponent', () => {
  let component: ProductSComponent;
  let fixture: ComponentFixture<ProductSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
