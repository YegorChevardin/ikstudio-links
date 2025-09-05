import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private timerId: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.updateTimer();
    });
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  private updateTimer() {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
    const diff = newYear.getTime() - now.getTime();

    this.ngZone.run(() => {
      if (diff > 0) {
        this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        this.minutes = Math.floor((diff / (1000 * 60)) % 60);
        this.seconds = Math.floor((diff / 1000) % 60);
      } else {
        this.days = this.hours = this.minutes = this.seconds = 0;
      }
    });
    this.timerId = setTimeout(() => {
      this.updateTimer();
    }, 1000);
  }

}
