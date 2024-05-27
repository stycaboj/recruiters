import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { VacanciesRoutingModule } from './vacancies-routing.module';
import { VacanciesComponent } from './vacancies.component';
import { DialogVacanciesComponent } from './dialog-vacancies/dialog-vacancies.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PutVacanciesComponent } from './put-vacancies/put-vacancies.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerModule } from '../../core/shared/spinner/spinner.module';
import { ListVacanciesComponent } from './list-vacancies/list-vacancies.component';

@NgModule({
  declarations: [
    VacanciesComponent,
    DialogVacanciesComponent,
    PutVacanciesComponent,
    ListVacanciesComponent,
  ],
  imports: [
    CommonModule,
    VacanciesRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SpinnerModule
  ],
  providers: [],
})
export class VacanciesModule {}
