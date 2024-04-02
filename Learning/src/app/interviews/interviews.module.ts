import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InterviewsRoutingModule } from './interviews-routing.module';
import { InterviewsComponent } from './interviews.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { DialogInterviewsComponent } from './dialog-interviews/dialog-interviews.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PutInterviewsComponent } from './put-interviews/put-interviews.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerModule } from '../../core/shared/spinner/spinner.component.module';

@NgModule({
  declarations: [
    InterviewsComponent, DialogInterviewsComponent, PutInterviewsComponent
  ],
  imports: [
    CommonModule,
    InterviewsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
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
export class InterviewsModule {}
