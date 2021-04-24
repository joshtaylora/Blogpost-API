import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCardListComponent } from './posts-card-list.component';

describe('PostsCardListComponent', () => {
  let component: PostsCardListComponent;
  let fixture: ComponentFixture<PostsCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
