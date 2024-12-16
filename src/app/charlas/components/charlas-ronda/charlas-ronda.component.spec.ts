import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlasRondaComponent } from './charlas-ronda.component';

describe('CharlasRondaComponent', () => {
  let component: CharlasRondaComponent;
  let fixture: ComponentFixture<CharlasRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharlasRondaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharlasRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
