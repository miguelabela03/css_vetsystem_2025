import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthorisationService } from "../services/authorisation.service";
import { AppointmentService } from "../services/appointment.service";

@Injectable({
    providedIn: "root"
})
export class RouteGuard implements CanActivate {

    constructor(
        private authService: AuthorisationService,
        private appointmentService: AppointmentService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const url = state.url;
        const pathSegments = url.split('/').filter(segment => segment !== '');
        let firstSegment = pathSegments[0];

        const isAuthenticated = this.authService.isAuthenticated();
        console.log(isAuthenticated);

        if (!isAuthenticated) {
            // Allow login page access if unauthenticated
            if (firstSegment === 'login') {
                return true;
            }
            // Redirect all other unauthenticated users to login
            return this.router.createUrlTree(['/login']);
        }

        const userRole = this.authService.getUserRole();

        if (userRole === 'ADMIN') {
            return true; // Full access
        }

        if (userRole === 'VET') {
            if(firstSegment === 'add') {
                return this.router.createUrlTree(['/appointments']);
            }
            else if (firstSegment === 'delete') {
                return this.router.createUrlTree(['/appointments']);
            }
            return true;
        }

        if (userRole === 'RECEPTIONIST') {
            if (firstSegment === 'delete') {
                return this.router.createUrlTree(['/appointments']);
            }

            // if (url.includes('/update')) {
            //     const appointmentId = route.params['id'];
            //     if (appointmentId) {
            //         const appointment = this.appointmentService.getAppointmentById(appointmentId);
            //         const currentDateTime = new Date();

            //     }
            // }

            return true;
        }

        return this.router.createUrlTree(['/appointments']);
    }
}
