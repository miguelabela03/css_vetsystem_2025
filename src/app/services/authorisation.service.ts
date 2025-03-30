import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../dto/login.dto";
import { UserSession } from "../dto/user-session.dto";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: "root"
})

export class AuthorisationService {
    endpoint: string = "http://localhost:8080/authenticate";

    // Function to create HTTP headers dynamically
    private getHttpHeaders(): HttpHeaders {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.getToken()
        });

        return headers;
    }

    constructor(private httpClient: HttpClient) {

    }

    // Login Request
    requestLogin(login: Login): Observable<UserSession> {
        return this.httpClient.post<UserSession>(this.endpoint, {
            password: login.password,
            username: login.username
        }, { headers: this.getHttpHeaders()}).pipe(); // Use pipe() to handle response properly
    }

    // Gettin the jwtToken and returning a string or a null
    getToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    // Getting the user role and returning a string or a null
    getUserRole(): string | null {
        return localStorage.getItem('userRole'); // Retrieve user role from localStorage
    }

    // Getting the token and checking if it exists
    isAuthenticated(): boolean {
        const token = this.getToken();
        // True or false will be retturned depending if the token exists or not
        return Boolean(token);
    }

}