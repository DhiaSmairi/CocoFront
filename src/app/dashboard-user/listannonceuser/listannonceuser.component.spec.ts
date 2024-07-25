import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListannonceuserComponent } from './listannonceuser.component';

describe('ListannonceuserComponent', () => {
  let component: ListannonceuserComponent;
  let fixture: ComponentFixture<ListannonceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListannonceuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListannonceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
