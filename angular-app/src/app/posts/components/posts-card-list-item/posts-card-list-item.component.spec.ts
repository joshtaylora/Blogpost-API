import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCardListItemComponent } from './posts-card-list-item.component';

describe('PostsCardListItemComponent', () => {
  let component: PostsCardListItemComponent;
  let fixture: ComponentFixture<PostsCardListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsCardListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsCardListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
