import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { VacanciesRoutingModule } from './vacancies-routing.module';
import { VacanciesComponent } from './vacancies.component';
import { RecruitersService } from '../../core/services/recruiters.service';

@NgModule({
  declarations: [VacanciesComponent],
  imports: [
    CommonModule,
    VacanciesRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [],
})
export class VacanciesModule {}
