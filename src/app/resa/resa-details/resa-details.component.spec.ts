import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaDetailsComponent } from './resa-details.component';

describe('ResaDetailsComponent', () => {
  let component: ResaDetailsComponent;
  let fixture: ComponentFixture<ResaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
