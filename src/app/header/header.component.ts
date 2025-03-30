import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  title: string = "Vet Appointment System";

  constructor(private appointmentService: AppointmentService) {

  }

  getUserRole(): string | null {
    return this.appointmentService.getUserRole();
  }
}
