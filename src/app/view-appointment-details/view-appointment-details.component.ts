import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-appointment-details',
  standalone: true,
  imports: [],
  templateUrl: './view-appointment-details.component.html',
  styleUrl: './view-appointment-details.component.css'
})

export class ViewAppointmentDetailsComponent implements OnInit {

  @Input()
  appointmentId!: number;

  appointment!: Appointment;

  constructor(private appointmentService: AppointmentService, private router: Router) {

  }

  ngOnInit(): void {
    console.log(this.appointmentId);

    this.appointmentService.getAppointmentById(this.appointmentId).subscribe((response: Appointment) => {
      this.appointment = response;
    });
  }

  onBackButtonClick() {
    this.router.navigate(["/appointments"]);
  }

}
