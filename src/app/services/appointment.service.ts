import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "../dto/appointment.dto";
import { AppointmentAddUpdate } from "../dto/appointment-add-update.dto";
import { AuthorisationService } from "./authorisation.service";

@Injectable ({
    providedIn: "root"
})

export class AppointmentService {
    endpoint: string = "http://localhost:8080/appointment";

    getHeaders() {
        return new HttpHeaders ({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwtToken')
        });
    }

    getUserRole(): string | null {
        return localStorage.getItem('userRole');
    } 

    constructor(private httpClient: HttpClient) {

    }

    getAppointments(): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(this.endpoint, {headers: this.getHeaders()});
    }

    getAppointmentById(appointmentId: number): Observable<Appointment> {
        return this.httpClient.get<Appointment>(this.endpoint + "/" + appointmentId, {headers: this.getHeaders()});
    }

    addAppointment(appointment: AppointmentAddUpdate): Observable<Appointment> {
        return this.httpClient.post<Appointment>(this.endpoint, appointment, {headers: this.getHeaders()})
    }

    updateAppointment(appointmentToUpdate: AppointmentAddUpdate, appointmentId: number) {
        return this.httpClient.put<Appointment>(this.endpoint + "/" + appointmentId, appointmentToUpdate, {headers: this.getHeaders()})
    }

    deleteAppointment(appointmentId: number): Observable<any> {
        return this.httpClient.delete(this.endpoint + "/" + appointmentId, {headers: this.getHeaders()});
    }
}