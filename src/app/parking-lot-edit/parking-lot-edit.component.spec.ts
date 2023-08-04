import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingLotEditComponent } from './parking-lot-edit.component';

describe('MallEditComponent', () => {
  let component: ParkingLotEditComponent;
  let fixture: ComponentFixture<ParkingLotEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingLotEditComponent]
    });
    fixture = TestBed.createComponent(ParkingLotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
