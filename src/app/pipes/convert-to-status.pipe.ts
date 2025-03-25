import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'convertToStatus', // This name will be used to call the pipe from the template
    standalone: true
})

export class ConvertToStatusPipe implements PipeTransform {

    // The transform method will return a string and accept the original date and time from the list of appointments
    transform(date: string, time: string): string {
        // Splitting the date into parts >> [day, month, year]
        const dateParts = date.split("/");
        // Creating new date string as year-month-day format
        const formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
    
        // Combine date and time into a single ISO string
        const newDateTime = formattedDate + "T" + time;
        
        // Create a new Date Object using the newDateTime string
        const apiDate = new Date(newDateTime);
    
        // Get the current dateTime
        const currentDateTime = new Date();
    
        // Compare dates and return result
        if (apiDate < currentDateTime) {
            return "Past";
        } else {
            return "Upcoming";
        }
    }
    

}