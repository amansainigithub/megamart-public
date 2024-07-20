import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshUserRegisterComponent } from './fresh-user-register.component';

describe('FreshUserRegisterComponent', () => {
  let component: FreshUserRegisterComponent;
  let fixture: ComponentFixture<FreshUserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreshUserRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreshUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
