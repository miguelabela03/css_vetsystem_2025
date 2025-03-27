import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { ConvertToStatusPipe } from '../pipes/convert-to-status.pipe';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once an appointment is deleted it cannot be retrieved!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'maroon',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.deleteAppointment(appointmentId).subscribe({
          next: () => {
            this.appointments = this.appointments.filter(({ appointmentId: id }) => id !== appointmentId);
            Swal.fire('Deleted!', 'The appointment has been deleted.', 'success');
          },
          error: (err) => {
            Swal.fire('Error!', 'Something went wrong while deleting the appointment.', 'error');
            console.error('Error deleting appointment:', err);
          }
        });
      }
    });
  }
}
