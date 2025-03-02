import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWatchingComponent } from './product-watching.component';

describe('ProductWatchingComponent', () => {
  let component: ProductWatchingComponent;
  let fixture: ComponentFixture<ProductWatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductWatchingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductWatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
