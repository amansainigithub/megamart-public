import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPlacedSuccessComponent } from './order-placed-success.component';

describe('OrderPlacedSuccessComponent', () => {
  let component: OrderPlacedSuccessComponent;
  let fixture: ComponentFixture<OrderPlacedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderPlacedSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderPlacedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
