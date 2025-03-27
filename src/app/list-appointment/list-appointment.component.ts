import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { ConvertToStatusPipe } from '../pipes/convert-to-status.pipe';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-appointment',
  standalone: true,
  imports: [RouterLink, ConvertToStatusPipe],
  templateUrl: './list-appointment.component.html',
  styleUrl: './list-appointment.component.css'
})

export class ListAppointmentComponent implements OnInit {

  appointments: Appointment[] = [];

  excelFileName = 'Appointments.xlsx';

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

  // https://pankaj-kumar.medium.com/how-to-export-data-to-excel-file-in-angular-application-3d88a11900f9
  // This function only exports the data showing within the table
  // exportToExcel(): void
  // {
  //   /* pass here the table id */
  //   let element = document.getElementById('export-table');
  //   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
  //   /* save to file */  
  //   XLSX.writeFile(wb, this.excelFileName);
  // }

  exportToExcel(): void {
    // Fetching all data from the API
    this.appointmentService.getAppointments().subscribe((appointments: Appointment[]) => {

        // Convert data to excel worksheet
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(appointments);

        //Create a new workbook and append the worksheet
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, this.excelFileName);

        // Save to file
        XLSX.writeFile(wb, this.excelFileName);
    })
  };

}
