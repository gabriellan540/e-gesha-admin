import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingEditComponent } from '../booking-edit/booking-edit.component';
import { BookingService } from '../services/booking.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  displayedColumns: string[] = ['customerName', 'timeSlot', 'parkingLot', 'spotName', 'amountPaid', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _bookService: BookingService,
    private _coreService: CoreService,
    private confirmationDialogService: ConfirmationDialogService,
  ) {}

  ngOnInit(): void{
    this.getBookingList();
  }

  openBookingsForm() {
    const dialogRef = this._dialog.open(BookingEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getBookingList();
        }
      }
    })
  }

  getBookingList(){
    this._bookService.getBookingList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBooking(id: number){
    this.confirmationDialogService.openConfirmDialog('Delete user?')
    .afterClosed().subscribe(res =>{
      if(res){
        this._bookService.deleteBooking(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Booking deleted', 'done');
            this.getBookingList();
          },
          error: console.log,
        })
      }
    })
  }

  openBookingEditForm(data: any){
    const dialogRef = this._dialog.open(BookingEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getBookingList();
        }
      }
    })
  }
}

