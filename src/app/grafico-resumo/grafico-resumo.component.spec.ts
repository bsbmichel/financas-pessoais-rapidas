import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoResumoComponent } from './grafico-resumo.component';

describe('GraficoResumoComponent', () => {
  let component: GraficoResumoComponent;
  let fixture: ComponentFixture<GraficoResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoResumoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
