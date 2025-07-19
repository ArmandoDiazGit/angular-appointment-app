import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTittle: string = '';
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = [];

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem('appointments');
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment(): void {
    if (this.newAppointmentTittle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTittle,
        date: this.newAppointmentDate,
      };

      this.appointments.push(newAppointment);
      this.newAppointmentDate = new Date();
      this.newAppointmentTittle = '';

      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number): void {
    this.appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
