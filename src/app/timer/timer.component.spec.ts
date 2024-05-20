import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerComponent } from './timer.component';
import any = jasmine.any;
import { Component } from "@angular/core";

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call displayTime in ngOnInit', () => {
    spyOn(component, 'displayTime'); // Spying on displayTime method
    component.ngOnInit();
    expect(component.displayTime).toHaveBeenCalledWith(any(Number));
  });

});
