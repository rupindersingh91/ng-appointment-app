import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent implements OnInit {

  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = []

  // life cycle hook (called on loading the page)
  ngOnInit(): void {
    // fetch data from local storage
    let savedAppointments = localStorage.getItem("appointments")
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  // Add appointments
  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      // payload
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }
      // collect to array
      this.appointments.push(newAppointment)

      // empty the fields
      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();

      // add data to local storage
      localStorage.setItem("appointments", JSON.stringify(this.appointments))
    }
  }

  // delete appoinments
  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);

    // update local storage
    localStorage.setItem("appointments", JSON.stringify(this.appointments))
  }

}
