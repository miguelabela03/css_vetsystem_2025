import { Routes } from '@angular/router';
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { ViewAppointmentDetailsComponent } from './view-appointment-details/view-appointment-details.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { LoginComponent } from './login/login.component';
import { RouteGuard } from './guards/routes.guard';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" }, // Used when opening the application
    {path: "login", component:LoginComponent},
    {path: "add", component: AddAppointmentComponent, canActivate: [RouteGuard]},
    {path: "update/:appointmentId", component: UpdateAppointmentComponent, canActivate: [RouteGuard]},
    {path: "appointments", component: ListAppointmentComponent, canActivate: [RouteGuard]},
    {path: "appointments/:appointmentId", component: ViewAppointmentDetailsComponent, canActivate: [RouteGuard]},
    {path: "sign-out", component: SignOutComponent, canActivate: [RouteGuard]},
    {path: "**", redirectTo: "/appointments", pathMatch: "full"} // Used after authorisation
];
