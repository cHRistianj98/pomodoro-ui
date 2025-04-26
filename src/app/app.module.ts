import { NgModule } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, NgForOf, NgIf, NgStyle } from "@angular/common";
import { TaskService } from "./task/services/task.service";
import { HttpClientModule } from "@angular/common/http";
import { TaskTileComponent } from "./task-tile/task-tile.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationService } from "./registration/services/registration.service";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  exports: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    HttpClientModule,
    NgStyle,
    ReactiveFormsModule,
    NgIf,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RegistrationComponent
  ],
  providers: [TaskService, RegistrationService], // Important! Put all services here
  declarations: [
    TaskComponent,
    TaskTileComponent,
  ]
})
export class AppModule {
}
