import { NgModule } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { FormsModule } from "@angular/forms";
import {NgForOf, NgStyle} from "@angular/common";
import { TaskService } from "./task/services/task.service";
import { HttpClientModule } from "@angular/common/http";
import {TaskTileComponent} from "./task-tile/task-tile.component";

@NgModule({
  exports: [
    TaskComponent
  ],
  imports: [
    FormsModule,
    NgForOf,
    HttpClientModule,
    NgStyle
  ],
  providers: [TaskService],
  declarations: [
    TaskComponent,
    TaskTileComponent
  ]
})
export class AppModule {
}
