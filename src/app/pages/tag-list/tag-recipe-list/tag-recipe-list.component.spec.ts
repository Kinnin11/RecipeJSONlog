import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagRecipeListComponent } from './tag-recipe-list.component';

describe('TagRecipeListComponent', () => {
  let component: TagRecipeListComponent;
  let fixture: ComponentFixture<TagRecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagRecipeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
