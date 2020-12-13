import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationEditionProductComponent } from './creation-edition-product.component';

describe('CreationEditionProductComponent', () => {
  let component: CreationEditionProductComponent;
  let fixture: ComponentFixture<CreationEditionProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationEditionProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationEditionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
