import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importujesz CommonModule, jeśli używasz dyrektyw Angulara jak *ngIf, *ngFor
import { Subscription, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule], // Zaimportuj tutaj inne wymagane moduły/dyrektywy/komponenty
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  private countdown: number = 30 * 60; // 30 minut w sekundach
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

  private displayTime(seconds: number): void {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    this.timeDisplay = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  }
}
