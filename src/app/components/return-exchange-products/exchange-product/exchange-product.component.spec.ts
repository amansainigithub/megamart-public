import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeProductComponent } from './exchange-product.component';

describe('ExchangeProductComponent', () => {
  let component: ExchangeProductComponent;
  let fixture: ComponentFixture<ExchangeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExchangeProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
