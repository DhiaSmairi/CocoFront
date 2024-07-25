import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAnnonceCovoiComponent } from './mes-annonce-covoi.component';

describe('MesAnnonceCovoiComponent', () => {
  let component: MesAnnonceCovoiComponent;
  let fixture: ComponentFixture<MesAnnonceCovoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesAnnonceCovoiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesAnnonceCovoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
