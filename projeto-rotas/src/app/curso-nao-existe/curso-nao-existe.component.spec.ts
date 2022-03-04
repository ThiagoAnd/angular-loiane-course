import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoNaoExisteComponent } from './curso-nao-existe.component';

describe('CursoNaoExisteComponent', () => {
  let component: CursoNaoExisteComponent;
  let fixture: ComponentFixture<CursoNaoExisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoNaoExisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoNaoExisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
