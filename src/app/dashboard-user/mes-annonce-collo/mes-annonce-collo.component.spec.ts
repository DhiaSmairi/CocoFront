import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAnnonceColloComponent } from './mes-annonce-collo.component';

describe('MesAnnonceColloComponent', () => {
  let component: MesAnnonceColloComponent;
  let fixture: ComponentFixture<MesAnnonceColloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesAnnonceColloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesAnnonceColloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
