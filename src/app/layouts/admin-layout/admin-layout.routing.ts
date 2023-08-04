import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import {  ParkingLotComponent } from 'app/parking-lot/parking-lot.component';
import { UserComponent } from 'app/user/user.component';
import { BookingComponent } from 'app/booking/booking.component';
import { AuthGuard } from 'app/guard/auth.guard';
import { ParkingSlotComponent } from 'app/parking-slot/parking-slot.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent},
    { path: 'employees',  component: UserComponent, canActivate: [AuthGuard] },
    { path: 'bookings',  component: BookingComponent,canActivate: [AuthGuard]},
    { path: 'malls',  component: ParkingLotComponent, canActivate: [AuthGuard] },
    { path: 'slots',  component: ParkingSlotComponent, canActivate: [AuthGuard] },
];
