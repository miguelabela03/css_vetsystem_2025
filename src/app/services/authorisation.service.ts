import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserSession } from "../dto/user-session.dto";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AuthorisationService {
    endpoint: string = "http://localhost:8080/authenticate";

    // Function to create HTTP headers dynamically
    private httpHeader = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        })
    };
    
    constructor(private httpClient: HttpClient) {

    }

    // Login Request
    requestLogin(loginDetails: { password: string, username: string }): Observable<any> {
        return this.httpClient.post<any>( this.endpoint, loginDetails, this.httpHeader).pipe(
            tap(response => {
                if (response && response.jwtToken) {
                    localStorage.setItem('jwtToken', response.jwtToken);
                    localStorage.setItem('userRole', response.role);
                } else {
                    console.log("No token recieved in response!");
                }
            })
        );
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