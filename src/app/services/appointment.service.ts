import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "../dto/appointment.dto";
import { AppointmentAddUpdate } from "../dto/appointment-add-update.dto";

@Injectable ({
    providedIn: "root"
})

export class AppointmentService {
    endpoint: string = "http://localhost:8080/appointment";

    httpHeader= {
        headers: new HttpHeaders ({
            "Content-Type": "application/json"
        })
    }

    constructor(private httpClient: HttpClient) {

    }

    getAppointments(): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(this.endpoint);
    }

    getAppointmentById(appointmentId: number): Observable<Appointment> {
        return this.httpClient.get<Appointment>(this.endpoint + "/" + appointmentId);
    }

    addAppointment(appointment: AppointmentAddUpdate): Observable<Appointment> {
        return this.httpClient.post<Appointment>(this.endpoint, appointment, this.httpHeader)
    }

    updateAppointment(appointmentToUpdate: AppointmentAddUpdate, appointmentId: number) {
        return this.httpClient.put<Appointment>(this.endpoint + "/" + appointmentId, appointmentToUpdate, this.httpHeader)
    }

    deleteAppointment(appointmentId: number): Observable<any> {
        return this.httpClient.delete(this.endpoint + "/" + appointmentId);
    }
}