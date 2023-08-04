import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingLotEditComponent } from '../parking-lot-edit/parking-lot-edit.component';
import { MallService } from '../services/mall.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css']
})

export class ParkingLotComponent implements OnInit{
  displayedColumns: string[] = ['spaceName', 'location', 'description', 'securityFeatures', 'availableSlots', 'amount', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _mallService: MallService,
    private _coreService: CoreService,
    private confirmationDialogService: ConfirmationDialogService,
  ) {}

  ngOnInit(): void{
    this.getMallList();
  }

  openMallsForm() {
    const dialogRef = this._dialog.open(ParkingLotEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getMallList();
        }
      }
    })
  }

  getMallList(){
    this._mallService.getMallList().subscribe({
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

  deleteMall(id: number){
    this.confirmationDialogService.openConfirmDialog('Delete parking lot?')
    .afterClosed().subscribe(res =>{
      if(res){
        this._mallService.deleteMall(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Parking lot deleted', 'done');
            this.getMallList();
          },
          error: console.log,
        })
      }
    })
  }

  openParkingLotEditForm(data: any){
    const dialogRef = this._dialog.open(ParkingLotEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getMallList();
        }
      }
    })
  }
}

