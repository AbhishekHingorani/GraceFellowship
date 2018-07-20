import { Component, OnInit } from '@angular/core';

enum MonthList{ January = 1, February, March, April, May, June, July, August, September, October,November, December };
enum Weekdays{Monday=1, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date = new Date();
  constructor() {
    setInterval(() => {
      this.date = new Date();
    }, 1);
  }

  ngOnInit() {
  }

  day(): string{
    return this.date.getDate() + '' + this.getOrdinal(this.date.getDate());
  }

  weekday(): string {
    return Weekdays[this.date.getDay()];
  }

  month(): string{
    return MonthList[this.date.getMonth()+1];
  }

  year(): string{
    return this.date.getFullYear() + '';
  }

  time(): string{
    let h: any = this.date.getHours(); 
    let m: any = this.date.getMinutes(); 
    let s: any = this.date.getSeconds()

    if(h<10) h = '0' + h;
    if(m<10) m = '0' + m;
    if(s<10) s = '0' + s;
    return h + ' : ' + m + ' : ' + s;
  }

  getOrdinal(d) {
    if(d>3 && d<21) return 'th'; // thanks kennebec
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
} 

  //document.body.innerHTML = date+nth(date) +" "+month+" "+fortnightAway.getFullYear();
}
