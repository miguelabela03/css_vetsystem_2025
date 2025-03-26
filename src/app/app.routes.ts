import { Routes } from '@angular/router';
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { ViewAppointmentDetailsComponent } from './view-appointment-details/view-appointment-details.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';

export const routes: Routes = [
    {path: "add", component: AddAppointmentComponent},
    {path: "update", component: UpdateAppointmentComponent},
    {path: "appointments", component: ListAppointmentComponent},
    {path: "appointments/:appointmentId", component: ViewAppointmentDetailsComponent},
    {path: "**", redirectTo: "/appointments", pathMatch: "full"}
];
