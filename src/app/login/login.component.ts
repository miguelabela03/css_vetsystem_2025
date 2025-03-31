import { Component, OnInit } from '@angular/core';
import { Login } from '../dto/login.dto';
import { AuthorisationService } from '../services/authorisation.service';
import { Router } from '@angular/router';
import { UserSession } from '../dto/user-session.dto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authoService: AuthorisationService, private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // console.log(this.loginForm.value);
    const loginDetails = this.loginForm.value;
    // console.log("Login Details" + loginDetails);
    this.authoService.requestLogin(loginDetails).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Login Successful',
          text: 'You are logged in.',
          icon: 'success',
          confirmButtonColor: 'green',
          confirmButtonText: 'OK'
        });
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

  shouldProcessControlValidateMessage(controlName: string) {
    let control = this.loginForm.get(controlName);
    return ((control!.touched || control!.dirty) && control!.errors);
  }
}
