import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharlaComponent } from './edit-charla.component';

describe('EditCharlaComponent', () => {
  let component: EditCharlaComponent;
  let fixture: ComponentFixture<EditCharlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCharlaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
