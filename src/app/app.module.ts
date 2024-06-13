import { NgModule } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, NgForOf, NgIf, NgStyle } from "@angular/common";
import { TaskService } from "./task/services/task.service";
import { HttpClientModule } from "@angular/common/http";
import { TaskTileComponent } from "./task-tile/task-tile.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationService } from "./registration/services/registration.service";

@NgModule({
  exports: [
    TaskComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    HttpClientModule,
    NgStyle,
    ReactiveFormsModule,
    NgIf
  ],
  providers: [TaskService, RegistrationService], // Important! Put all services here
  declarations: [
    TaskComponent,
    TaskTileComponent,
    RegistrationComponent
  ]
})
export class AppModule {
}
