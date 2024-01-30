import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InterviewsRoutingModule } from "./interviews-routing.module";
import { InterviewsComponent } from "./interviews.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [
        InterviewsComponent
    ],
    imports: [
      CommonModule,
      InterviewsRoutingModule,
      MatButtonModule,
      MatIconModule,
      MatTableModule
    ],
    providers: [],
  })
  export class InterviewsModule {}