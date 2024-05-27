import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InterviewModel } from '../../../core/models/interview.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VacancyModel } from '../../../core/models/vacancy.model';
import { RecruiterModel } from '../../../core/models/recruiter.model';

@Component({
  selector: 'app-put-interviews',
  templateUrl: './put-interviews.component.html',
  styleUrl: './put-interviews.component.scss',
})
export class PutInterviewsComponent {
  public form: FormGroup;

  // TODO: баг с date
  // TODO: в put-vacancies и put-interviews не работает data model
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PutInterviewsComponent>
  ) {
    this.form = this.formBuilder.group({
      vacancy: new FormControl('', Validators.required),
      candidate: new FormControl('', Validators.required),
      recruiter: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });

    this.form.patchValue({
      vacancy: this.data.interview.vacancy.id,
      candidate: this.data.interview.candidate.id,
      recruiter: this.data.interview.recruiter.id,
      date: this.data.interview.dateTime,
    });
  }

  public save(): void {
    const updatedInterview: InterviewModel = {
      id: this.data.interview.id,
      vacancy: this.data.vacancies.find(
        (item: VacancyModel) => item.id == this.form.value.vacancy
      ),
      candidate: this.data.candidates.find(
        (item: VacancyModel) => item.id == this.form.value.vacancy
      ),
      recruiter: this.data.recruiters.find(
        (item: RecruiterModel) => item.id == this.form.value.recruiter
      ),
      dateTime: this.form.value.date,
    };
    this.dialogRef.close(updatedInterview);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
