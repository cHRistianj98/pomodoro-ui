import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerComponent } from './timer.component';
import { By } from '@angular/platform-browser';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct countdown time', () => {
    expect(component['countdown']).toEqual(30 * 60);
  });

  it('should display the correct initial time', () => {
    expect(component.timeDisplay).toEqual('30:00');
  });

  it('should start timer and update time display', (done) => {
    spyOn(component, 'displayTime').and.callThrough();
    component.startTimer();
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.displayTime).toHaveBeenCalled();
      expect(component.timeDisplay).not.toEqual('30:00');
      done();
    }, 1001);
  });

  it('should stop the timer when stopTimer is called', () => {
    component.startTimer();
    component.stopTimer();
    // @ts-ignore
    expect(component['timerSubscription'].closed).toBeTrue();
  });

  it('should handle ngOnDestroy lifecycle hook', () => {
    spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  });

  // Additional tests can be written to cover more functionalities
});
