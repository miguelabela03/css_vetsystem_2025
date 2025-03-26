import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { AppointmentAddUpdate } from '../dto/appointment-add-update.dto';
import { Appointment } from '../dto/appointment.dto';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})

export class AddAppointmentComponent implements OnInit {

  appointmentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private router: Router) {

  }

  // Validation:
  // All fields are required
  //
  // ownerContactNumber: pattern >>
  // a) The ^ ensures that the string starts with numeric characters
  // b) The [0-9] define the acceptable group of characters, in this case any digit from 0 to 9
  // c) The + shows that there should be one or more of the acceptable group of characters
  // d) The $ checks that the entire string matches the pattern specified and not just a part of it
  //
  // ownerIdCardNumber: patter >>
  // a) The ^[0-9]{2,} ensures that there are at least 2 digits from the group of acceptable characters
  // b) The [A-Z] accepts only 1 uppercase letter, thus lowercase are not allowed
  // c) The $ again checks that the string pattern specified is correct
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
  }

  // This function was created to pass the date into the backend/api since it should be a string
  formatDate(formDate: string): string {
    // Create a new date object from the date chosen in the form
    const dt = new Date(formDate);
    
    // Extracting the day, month and year from the newly created date object
    const appointmentDay = String(dt.getDate()).padStart(2, '0'); // The pas start ensures that there are 2 digits
    const appointmentMonth = String(dt.getMonth() + 1).padStart(2, '0'); // Same concept but adding one since months in js start from 0
    const appointmentYear = String(dt.getFullYear());

    // Creating the new appointment date
    const newAppointmentDate = appointmentDay + "/" + appointmentMonth + "/" + appointmentYear;

    return newAppointmentDate;
  }

  submitForm() {
    console.log(JSON.stringify(this.appointmentForm.value));

    // Getting the form values
    const appointmentToAdd: AppointmentAddUpdate = this.appointmentForm.value;

    // Formatting the date if it exists
    if (appointmentToAdd.appointmentDate) {
      appointmentToAdd.appointmentDate = this.formatDate(appointmentToAdd.appointmentDate);
    }

    this.appointmentService.addAppointment(appointmentToAdd).subscribe((addedAppointment: Appointment) => {
      console.log(JSON.stringify(addedAppointment));
      this.router.navigate(["/appointments"]);
    })
  }

  shouldProcessControlValidateMessage(controlName: string) {
    let control = this.appointmentForm.get(controlName);
    return ((control!.touched || control!.dirty) && control!.errors);
  }

}
