import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCharlaComponent } from './post-charla.component';

describe('PostCharlaComponent', () => {
  let component: PostCharlaComponent;
  let fixture: ComponentFixture<PostCharlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCharlaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
