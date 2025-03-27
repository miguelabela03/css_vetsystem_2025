import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { ConvertToStatusPipe } from '../pipes/convert-to-status.pipe';

@Component({
  selector: 'app-list-appointment',
  standalone: true,
  imports: [RouterLink, ConvertToStatusPipe],
  templateUrl: './list-appointment.component.html',
  styleUrl: './list-appointment.component.css'
})

export class ListAppointmentComponent implements OnInit {

  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {

  }

  ngOnInit(): void {
    this.initialiseAppointment();
  }

  initialiseAppointment() {
    this.appointmentService.getAppointments().subscribe((response: Appointment[]) => {
      this.appointments = response;
    })
  }

  deleteAppointment(appointmentId: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(appointmentId).subscribe({
        next: () => {
          this.appointments = this.appointments.filter(function (appointment) {
            return appointment.appointmentId !== appointmentId;
          });
          console.log('Appointment deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting appointment:', err);
        }
      });
    }
  }
}
