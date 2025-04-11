import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { AppointmentAddUpdate } from '../dto/appointment-add-update.dto';
import { Appointment } from '../dto/appointment.dto';

@Component({
  selector: 'app-update-appointment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-appointment.component.html',
  styleUrl: './update-appointment.component.css'
})

export class UpdateAppointmentComponent implements OnInit {

  @Input()
  appointmentId!: number;

  appointment!: Appointment;

  appointmentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private router: Router) {

  }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      animalType: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      ownerSurname: ['', [Validators.required]],
      ownerContactNumber: ['', [
        Validators.required,
        Validators.minLength(8), // Minimum length of 8 digits
        Validators.pattern('^[0-9]+$') // Only numeric and non-negative
      ]],
      ownerIdCardNumber: ['', [
        Validators.required,
        Validators.minLength(3), // Minimum length of 2 digits and a letter
        Validators.pattern('^[0-9]{2,}[A-Z]$')
      ]],
      appointmentDate: ['', [Validators.required]], // TODO: Implement Date Validation
      appointmentTime: ['', [Validators.required]], // TODO: Implement Time Validation
      appointmentDuration: ['', [Validators.required]],
      reasonForAppointment: ['', [Validators.required]],
      vetNotes: [''],
    });

    // Fetch the appointment details
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe((appointment: Appointment) => {
      this.appointment = appointment; // Store the appointment

      this.appointmentForm.patchValue({
        patientName: appointment.patientName,
        animalType: appointment.animalType,
        ownerName: appointment.ownerName,
        ownerSurname: appointment.ownerSurname,
        ownerContactNumber: appointment.ownerContactNumber,
        ownerIdCardNumber: appointment.ownerIdCardNumber,
        appointmentDate: this.formatDate(appointment.appointmentDate),
        appointmentTime: appointment.appointmentTime,
        appointmentDuration: appointment.appointmentDuration,
        reasonForAppointment: appointment.reasonForAppointment,
        vetNotes: appointment.vetNotes,
      });
    });
  }

  // Fetching and converting the date string from the backend
  formatDate(formDate: string): string {
    if (!formDate) return ''; // Handle empty values gracefully
    //console.log(formDate);
  
    // Split the date assuming it's in "dd/MM/yyyy" format
    const parts = formDate.split('/');
    if (parts.length !== 3) return ''; // Ensure it has day, month, year
  
    const [day, month, year] = parts;
  
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Convert to "yyyy-MM-dd"
  }  
  

  // Converting the date string from "yyyy-MM-dd" back to "dd/MM/yyyy" for backend/api
  formatDateForBackend(dateString: string): string {
    if (!dateString) return '';
  
    const parts = dateString.split('-'); // Expecting "yyyy-MM-dd"
    if (parts.length !== 3) return '';
  
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`; // Convert to "dd/MM/yyyy" for backend
  }  
  

  submitForm() {
    console.log(JSON.stringify(this.appointmentForm.value));
  
    const appointmentToUpdate: AppointmentAddUpdate = this.appointmentForm.value;
  
    if (appointmentToUpdate.appointmentDate) {
      appointmentToUpdate.appointmentDate = this.formatDateForBackend(appointmentToUpdate.appointmentDate);
    }
  
    this.appointmentService.updateAppointment(appointmentToUpdate, this.appointment.appointmentId).subscribe((updatedAppointment: Appointment) => {
      console.log(JSON.stringify(updatedAppointment));
      this.router.navigate(["/appointments"]);
    });
  }

  shouldProcessControlValidateMessage(controlName: string) {
    let control = this.appointmentForm.get(controlName);
    return ((control!.touched || control!.dirty) && control!.errors);
  }

  onBackButtonClick() {
    this.router.navigate(["/appointments"]);
  }

  getUserRole(): string | null {
    return this.appointmentService.getUserRole();
  }
}
