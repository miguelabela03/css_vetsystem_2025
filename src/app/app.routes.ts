import { Routes } from '@angular/router';
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { ViewAppointmentDetailsComponent } from './view-appointment-details/view-appointment-details.component';

export const routes: Routes = [
    {path: "appointments", component: ListAppointmentComponent},
    {path: "appointments/:appointmentId", component: ViewAppointmentDetailsComponent}
];
