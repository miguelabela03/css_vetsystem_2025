import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "../dto/appointment.dto";

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
}