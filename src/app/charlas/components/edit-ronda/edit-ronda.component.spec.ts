import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRondaComponent } from './edit-ronda.component';

describe('EditRondaComponent', () => {
  let component: EditRondaComponent;
  let fixture: ComponentFixture<EditRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRondaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
