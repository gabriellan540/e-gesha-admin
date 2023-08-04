import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingSlotEditComponent } from 'app/parking-slot-edit/parking-slot-edit.component';
import { ParkingSlotService } from 'app/services/parking-slot.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';

@Component({
  selector: 'app-parking-slot',
  templateUrl: './parking-slot.component.html',
  styleUrls: ['./parking-slot.component.css']
})

export class ParkingSlotComponent implements OnInit{
  displayedColumns: string[] = ['parkingLot','spotName', 'isAvailable', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _parkingSlotService: ParkingSlotService,
    private _coreService: CoreService,
    private confirmationDialogService: ConfirmationDialogService,
  ) {}

  ngOnInit(): void{
    this.getSpotList();
  }

  openParkingSpotForm() {
    const dialogRef = this._dialog.open(ParkingSlotEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getSpotList();
        }
      }
    })
  }

  getSpotList(){
    this._parkingSlotService.getSpotList().subscribe({
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

  deleteSpot(id: number){
    this.confirmationDialogService.openConfirmDialog('Delete Spot?')
    .afterClosed().subscribe(res =>{
      if(res){
        this._parkingSlotService.deleteSpot(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Spot deleted', 'done');
            this.getSpotList();
          },
          error: console.log,
        })
      }
    })
  }

  openSpotEditForm(data: any){
    const dialogRef = this._dialog.open(ParkingSlotEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getSpotList();
        }
      }
    })
  }
}

