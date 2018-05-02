import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TimeslotService {
  timeslots: any[];
  days: any;

  constructor() {
    this.timeslots = [
      { time: "7:00 AM - 8:00 AM", code: 1 },
      { time: "8:00 AM - 9:00 AM", code: 2 },
      { time: "9:00 AM - 10:00 AM", code: 3 },
      { time: "10:00 AM - 11:00 AM", code: 4 },
      { time: "11:00 AM - 12:00 PM", code: 5 },
      { time: "12:00 PM - 1:00 PM", code: 6 },
      { time: "1:00 PM - 2:00 PM", code: 7 },
      { time: "2:00 PM - 3:00 PM", code: 8 },
      { time: "3:00 PM - 4:00 PM", code: 9 },
      { time: "4:00 PM - 5:00 PM", code: 10 },
      { time: "5:00 PM - 6:00 PM", code: 11 },
      { time: "6:00 PM - 7:00 PM", code: 12 },
      { time: "7:00 PM - 8:00 PM", code: 13 },
      { time: "8:00 PM - 9:00 PM", code: 14 },
      { time: "9:00 PM - 10:00 PM", code: 15 },
      { time: "10:00 PM - 11:00 PM", code: 16 },
      { time: "11:00 PM - 12:00 MN", code: 17 }
    ];

    this.days = [
      { day: 'Monday', code: 0 },
      { day: 'Tuesday', code: 1 },
      { day: 'Wednesday', code: 2 },
      { day: 'Thursday', code: 3 },
      { day: 'Friday', code: 4 }
    ];
  }


  getAllTimeslots() {
    return this.timeslots;
  }

  getAllDays() {
    return this.days;
  }
}
