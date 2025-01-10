import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRondaComponent } from './post-ronda.component';

describe('PostRondaComponent', () => {
  let component: PostRondaComponent;
  let fixture: ComponentFixture<PostRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostRondaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
