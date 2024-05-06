import { NgModule } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { TaskService } from "./task/services/task.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  exports: [
    TaskComponent
  ],
  imports: [
    FormsModule,
    NgForOf,
    HttpClientModule
  ],
  providers: [TaskService],
  declarations: [
    TaskComponent
  ]
})
export class AppModule {
}
