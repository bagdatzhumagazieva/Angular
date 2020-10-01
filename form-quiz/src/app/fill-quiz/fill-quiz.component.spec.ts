import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillQuizComponent } from './fill-quiz.component';

describe('FillQuizComponent', () => {
  let component: FillQuizComponent;
  let fixture: ComponentFixture<FillQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
