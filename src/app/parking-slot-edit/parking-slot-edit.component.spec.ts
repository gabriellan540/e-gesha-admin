import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSlotEditComponent } from './parking-slot-edit.component';

describe('MallEditComponent', () => {
  let component: ParkingSlotEditComponent;
  let fixture: ComponentFixture<ParkingSlotEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSlotEditComponent]
    });
    fixture = TestBed.createComponent(ParkingSlotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
