import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParkingSlotService } from '../services/parking-slot.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-parking-slot-edit',
  templateUrl: './parking-slot-edit.component.html',
  styleUrls: ['./parking-slot-edit.component.css']
})

export class ParkingSlotEditComponent implements OnInit{
  parkingSpotsForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _parkingSlotService: ParkingSlotService,
    private _dialogRef: MatDialogRef <ParkingSlotEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    ){
    this.parkingSpotsForm = this._fb.group({
      spotName: new FormControl(null, Validators.required),
      isAvailable: new FormControl(null, Validators.required),
      parkingLot: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {
    this.parkingSpotsForm.patchValue(this.data);
  }

  onSubmit(){
    if (this.parkingSpotsForm.valid){
      if (this.data){
        this._parkingSlotService.updateSpot(this.data.id, this.parkingSpotsForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Parking spot updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._parkingSlotService.addSpot(this.parkingSpotsForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Parking spot created');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}


