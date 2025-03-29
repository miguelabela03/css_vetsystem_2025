import { Routes } from '@angular/router';
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { ViewAppointmentDetailsComponent } from './view-appointment-details/view-appointment-details.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: "add", component: AddAppointmentComponent},
    {path: "update/:appointmentId", component: UpdateAppointmentComponent},
    {path: "appointments", component: ListAppointmentComponent},
    {path: "appointments/:appointmentId", component: ViewAppointmentDetailsComponent},
    {path: "sign-out", component: SignOutComponent},
    {path: "login", component:LoginComponent},
    {path: "**", redirectTo: "/appointments", pathMatch: "full"}
];
