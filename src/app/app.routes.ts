import { CanMatchFn, Routes } from '@angular/router';
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { ViewAppointmentDetailsComponent } from './view-appointment-details/view-appointment-details.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { LoginComponent } from './login/login.component';
import { AuthorisationService } from './services/authorisation.service';
import { inject } from '@angular/core';

const detailsCanMatch: CanMatchFn = (route, segments) => {
    const authorisationService = inject(AuthorisationService);

    // Checking if the user was authorized
    const isAuthenticated = authorisationService.isAuthenticated();
    // Getting the user role 
    const userRole = authorisationService.getUserRole();
    // console.log(isAuthenticated);
    // console.log(userRole);

    if (isAuthenticated && (userRole === 'ADMIN' || userRole === 'RECEPTIONIST' || userRole === 'VET')) {
        return true;
    }

    alert('Access Denied: You are not authorized to view this page!');
    return false;
};

export const routes: Routes = [
    {path: "login", component:LoginComponent},
    {path: "add", component: AddAppointmentComponent, canMatch: [detailsCanMatch]},
    {path: "update/:appointmentId", component: UpdateAppointmentComponent, canMatch: [detailsCanMatch]},
    {path: "appointments", component: ListAppointmentComponent, canMatch: [detailsCanMatch]},
    {path: "appointments/:appointmentId", component: ViewAppointmentDetailsComponent, canMatch: [detailsCanMatch]},
    {path: "sign-out", component: SignOutComponent, canMatch: [detailsCanMatch]},
    {path: "**", redirectTo: "/appointments", pathMatch: "full"}
];
