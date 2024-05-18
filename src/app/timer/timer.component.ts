import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  private numberOfSecondsForPomodoroSession = 0.1 * 60;
  private remainingSeconds = this.numberOfSecondsForPomodoroSession;
  timeDisplay = '';
  private timerSubscription?: Subscription;

  ngOnInit(): void {
    this.displayTime(this.remainingSeconds);
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  startTimer(): void {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      return;
    }

    this.timerSubscription = interval(1000)
      .pipe(takeWhile(() => this.remainingSeconds > 0))
      .subscribe(() => {
        this.remainingSeconds--;
        this.displayTime(this.remainingSeconds);

        if (this.remainingSeconds === 0) {
          console.log('Pomodoro session is done!');
          this.remainingSeconds = this.numberOfSecondsForPomodoroSession
          this.displayTime(this.remainingSeconds);
          this.timerSubscription?.unsubscribe();
        }
      });
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  displayTime(seconds: number): void {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    this.timeDisplay = `${minutesLeft < 10 ? '0' : ''}${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  }
}
