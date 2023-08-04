import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { BookingComponent } from './booking/booking.component';
import { BookingEditComponent } from './booking-edit/booking-edit.component';
import { ParkingLotComponent } from './parking-lot/parking-lot.component';
import { ParkingLotEditComponent } from './parking-lot-edit/parking-lot-edit.component';
import { ParkingSlotComponent } from './parking-slot/parking-slot.component';
import { ParkingSlotEditComponent } from './parking-slot-edit/parking-slot-edit.component';
import { UserComponent } from './user/user.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './guard/auth.guard';

import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserEditComponent,
    BookingComponent,
    BookingEditComponent,
    ParkingLotComponent,
    ParkingLotEditComponent,
    UserComponent,
    ConfirmationDialogComponent,
    ParkingSlotComponent,
    ParkingSlotEditComponent,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
