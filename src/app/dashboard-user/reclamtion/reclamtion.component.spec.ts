import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamtionComponent } from './reclamtion.component';

describe('ReclamtionComponent', () => {
  let component: ReclamtionComponent;
  let fixture: ComponentFixture<ReclamtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamtionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
