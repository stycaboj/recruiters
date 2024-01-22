import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';

import { HomeRoutingModule } from "./home-routing.module";
import { TopRecruitersComponent } from "./top-recruiters/top-recruiters.component";
import { TopVacanciesComponent } from "./top-vacancies/top-vacancies.component";
import { HomeComponent } from "./home.component";

@NgModule({
    declarations: [
        TopRecruitersComponent,
        TopVacanciesComponent,
        HomeComponent,
    ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      MatCardModule
    ],
    providers: [],
  })
  export class HomeModule { }