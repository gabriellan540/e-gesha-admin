import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSlotComponent } from './parking-slot.component'

describe('ParkingSlotComponent', () => {
  let component: ParkingSlotComponent;
  let fixture: ComponentFixture<ParkingSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSlotComponent]
    });
    fixture = TestBed.createComponent(ParkingSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
