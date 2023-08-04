import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
  ) {}

 
  ngOnInit(): void{
    this.getEmployeelist();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(UserEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getEmployeelist();
        }
      }
    })
  }

  getEmployeelist(){
    this._empService.getEmployeeList().subscribe({
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

  deleteEmployee(id: number){
    this.confirmationDialogService.openConfirmDialog('Delete user?')
    .afterClosed().subscribe(res =>{
      if(res){
        this._empService.deleteEmployee(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('User deleted', 'done');
            this.getEmployeelist();
          },
          error: console.log,
        })
      }
    })
  }

  openEditForm(data: any){
    const dialogRef = this._dialog.open(UserEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getEmployeelist();
        }
      }
    })
  }
}
