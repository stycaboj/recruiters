import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesComponent } from './candidates.component';
import { DialogCandidatesComponent } from './dialog-candidates/dialog-candidates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PutCandidatesComponent } from './put-candidates/put-candidates.component';

@NgModule({
  declarations: [CandidatesComponent, DialogCandidatesComponent, PutCandidatesComponent],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  providers: [],
})
export class CandidatesModule {}
