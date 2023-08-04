import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MallService } from '../services/mall.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-parking-lot-edit',
  templateUrl: './parking-lot-edit.component.html',
  styleUrls: ['./parking-lot-edit.component.css']
})

export class ParkingLotEditComponent implements OnInit{
  mallsForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _mallService: MallService,
    private _dialogRef: MatDialogRef <ParkingLotEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    ){
    this.mallsForm = this._fb.group({
      spaceName: new FormControl(null, Validators.required),
      spaceImage: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      securityFeatures: new FormControl(null, Validators.required),
      availableSlots: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.mallsForm.patchValue(this.data);
  }

  onSubmit(){
    if (this.mallsForm.valid){
      if (this.data){
        this._mallService.updateMall(this.data.id, this.mallsForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Parking lot updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._mallService.addMall(this.mallsForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Parking lot created');
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


