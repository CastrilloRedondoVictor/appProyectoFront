import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCharlaComponent } from './detalles-charla.component';

describe('DetallesCharlaComponent', () => {
  let component: DetallesCharlaComponent;
  let fixture: ComponentFixture<DetallesCharlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesCharlaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesCharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
