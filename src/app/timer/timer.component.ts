import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  private numberOfSecondsForPomodoroSession = 0.1 * 60;
  timeDisplay = '';
  private timerSubscription?: Subscription;

  ngOnInit(): void {
    this.displayTime(this.numberOfSecondsForPomodoroSession);
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  startTimer(): void {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }

    let remainingSeconds = this.numberOfSecondsForPomodoroSession;
    const timer$ = timer(0, 1000).pipe(
      map(oneSecond => remainingSeconds - oneSecond),
      takeWhile(time => time >= 0)
    );

    this.timerSubscription = timer$.subscribe(
      numberOfSecondsToDisplay => this.displayTime(numberOfSecondsToDisplay),
      null,
      () => console.log('Pomodoro session is done!')
    );
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
    this.timeDisplay = `${minutesLeft < 10 ? '0' : ''}${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`
  }
}

