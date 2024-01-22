import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InterviewsRoutingModule } from "./interviews-routing.module";
import { InterviewsComponent } from "./interviews.component";

@NgModule({
    declarations: [
        InterviewsComponent
    ],
    imports: [
      CommonModule,
      InterviewsRoutingModule
    ],
    providers: [],
  })
  export class InterviewsModule { }