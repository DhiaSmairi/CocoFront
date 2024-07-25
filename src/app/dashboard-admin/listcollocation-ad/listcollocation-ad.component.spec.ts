import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcollocationAdComponent } from './listcollocation-ad.component';

describe('ListcollocationAdComponent', () => {
  let component: ListcollocationAdComponent;
  let fixture: ComponentFixture<ListcollocationAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListcollocationAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListcollocationAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
