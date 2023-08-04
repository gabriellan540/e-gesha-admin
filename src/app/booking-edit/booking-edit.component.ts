import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.css']
})
export class BookingEditComponent implements OnInit{
  bookingsForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _bookingService: BookingService,
    private _dialogRef: MatDialogRef <BookingEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    ){
    this.bookingsForm = this._fb.group({
      customerName: new FormControl(null, Validators.required),
      timeSlot: new FormControl(null, Validators.required),
      amountPaid: new FormControl(null, Validators.required),
      parkingLot: new FormControl(null, Validators.required),
      spotName: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {
    this.bookingsForm.patchValue(this.data);
  }

  onSubmit(){
    if (this.bookingsForm.valid){
      if (this.data){
        this._bookingService.updateBooking(this.data.id, this.bookingsForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Booking updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._bookingService.addBooking(this.bookingsForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Booking created');
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




