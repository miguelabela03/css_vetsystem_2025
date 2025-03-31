import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.css'
})

export class SignOutComponent {

  constructor(private router: Router) {

  }

  onSignOut() {
    this.router.navigate(["/login"]);
  }
}
