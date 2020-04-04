import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterRecipeComponent } from './enter-recipe.component';

describe('EnterRecipeComponent', () => {
  let component: EnterRecipeComponent;
  let fixture: ComponentFixture<EnterRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
