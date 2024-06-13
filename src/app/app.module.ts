import { NgModule } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgForOf, NgIf, NgStyle } from "@angular/common";
import { TaskService } from "./task/services/task.service";
import { HttpClientModule } from "@angular/common/http";
import { TaskTileComponent } from "./task-tile/task-tile.component";
import { RegistrationComponent } from "./registration/registration.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  exports: [
    TaskComponent,
    RegistrationComponent
  ],
  imports: [
    FormsModule,
    NgForOf,
    HttpClientModule,
    NgStyle,
    ReactiveFormsModule,
    NgIf
  ],
  providers: [TaskService],
  declarations: [
    TaskComponent,
    TaskTileComponent,
    RegistrationComponent
  ]
})
export class AppModule {
}
