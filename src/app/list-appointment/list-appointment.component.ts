import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { ConvertToStatusPipe } from '../pipes/convert-to-status.pipe';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { concat } from 'rxjs';

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
  pdfFileName = 'Appointments.pdf';

  constructor(private appointmentService: AppointmentService, private router: Router) {

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
            Swal.fire('Error!', 'Only admins can delete appointments!', 'error');
            console.error('Error deleting appointment:', err);
            console.log(this.appointmentService.deleteAppointment(appointmentId));
          }
        });
      }
    });
  }

  // https://stackoverflow.com/questions/50147526/sheetjs-xlsx-cell-styling/69738925
  // This function only exports the data showing within the table
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('export-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    console.log(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.excelFileName);
  }

  // exportToExcel(): void {
  //   // Fetching all data from the API
  //   this.appointmentService.getAppointments().subscribe((appointments: Appointment[]) => {

  //     // Convert data to excel worksheet
  //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(appointments);

  //     //Create a new workbook and append the worksheet
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, this.excelFileName);

  //     // Save to file
  //     XLSX.writeFile(wb, this.excelFileName);
  //   })
  // };

  // https://www.geeksforgeeks.org/how-to-export-data-as-pdf-in-angular/
  exportToPDF() {
    const data = document.getElementById('export-table');
    html2canvas(data!).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('exported-file.pdf'); // Save the generated PDF
    });
  }

  getUserRole(): string | null {
    return this.appointmentService.getUserRole();
  }

  enabaleDisableUpdateBtn(appointmentStatus: string): boolean {
    if (this.getUserRole() === "RECEPTIONIST" && appointmentStatus !== "Upcoming") {
      return true;
    } else {
      return false;
    }
  }

  showUpdateForm(appointmentId: number, appointmentStatus: string) {
    if (!this.enabaleDisableUpdateBtn(appointmentStatus)) {
      this.router.navigate(['/update', appointmentId]);
    }
  }
  

  enabaleDisableDeleteBtn(): boolean {
    if (this.getUserRole() !== "ADMIN") {
      return true;
    } else {
      return false;
    }
  }
}
