import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { RecruitersRoutingModule } from './recruiters-routing.module';
import { RecruitersComponent } from './recruiters.component';
import { DialogRecruitersComponent } from './dialog-recruiters/dialog-recruiters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PutRecruitersComponent } from './put-recruiters/put-recruiters.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerModule } from '../../core/shared/spinner/spinner.component.module';

@NgModule({
  declarations: [RecruitersComponent, DialogRecruitersComponent, PutRecruitersComponent],
  imports: [
    CommonModule,
    RecruitersRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxSpinnerModule,
    SpinnerModule
  ],
  providers: [],
})
export class RecruitersModule {}
