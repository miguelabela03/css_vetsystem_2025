import { Component } from '@angular/core';
import { Login } from '../dto/login.dto';
import { AuthorisationService } from '../services/authorisation.service';
import { Router } from '@angular/router';
import { UserSession } from '../dto/user-session.dto';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginRequest: Login = new Login('', '');

  constructor(private authoService: AuthorisationService, private router: Router) {

  }

  onSubmit(): void {
    this.authoService.requestLogin(this.loginRequest).subscribe({
      next: (session: UserSession) => {
        // Storing the token and user role for later use within the local storage
        localStorage.setItem('jwtToken', session.jwtToken);
        localStorage.setItem('userRole', session.role);

        // If the user credentials are approved, they will be redirected to the appointments list page
        this.router.navigate(['/appointments']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid username or password. Please try again.',
          icon: 'error',
          confirmButtonColor: 'red',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
