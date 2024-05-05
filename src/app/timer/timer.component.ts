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
  private countdown: number = 30 * 60;
  timeDisplay: string = '30:00';
  private timerSubscription?: Subscription;

  ngOnInit(): void {
    this.displayTime(this.countdown);
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  startTimer(): void {
    const timer$ = timer(0, 1000).pipe(
      map(i => this.countdown - i),
      takeWhile(x => x >= 0)
    );

    this.timerSubscription = timer$.subscribe(
      val => this.displayTime(val),
      null,
      () => console.log('Timer completed')
    );
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  displayTime(seconds: number): void {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    this.timeDisplay = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  }
}

