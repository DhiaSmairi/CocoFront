import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcovoiturageAdComponent } from './listcovoiturage-ad.component';

describe('ListcovoiturageAdComponent', () => {
  let component: ListcovoiturageAdComponent;
  let fixture: ComponentFixture<ListcovoiturageAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListcovoiturageAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListcovoiturageAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
