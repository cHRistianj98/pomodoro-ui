import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  private readonly initialSeconds = 25 * 60;
  timeLeft = this.initialSeconds;
  intervalId?: number;
  faPlay = faPlay;

  get minutes(): string {
    const m = Math.floor(this.timeLeft / 60);
    return m < 10 ? `0${m}` : `${m}`;
  }

  get seconds(): string {
    const s = this.timeLeft % 60;
    return s < 10 ? `0${s}` : `${s}`;
  }

  start(): void {
    if (this.intervalId) return;
    this.intervalId = window.setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
    }, 1000);
  }
}
