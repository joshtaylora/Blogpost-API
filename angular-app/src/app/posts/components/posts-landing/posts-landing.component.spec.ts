import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsLandingComponent } from './posts-landing.component';

describe('PostsLandingComponent', () => {
  let component: PostsLandingComponent;
  let fixture: ComponentFixture<PostsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
