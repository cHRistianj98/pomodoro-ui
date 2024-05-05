import { NgModule } from '@angular/core';
import { TaskComponent } from './task/task.component';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@NgModule({
  exports: [
    TaskComponent
  ],
  imports: [
    FormsModule,
    NgForOf
  ],
  declarations: [
    TaskComponent
  ]
})
export class AppModule {

}
