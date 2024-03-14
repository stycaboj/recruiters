import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InterviewModel } from '../../../core/models/interview.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VacanciesService } from '../../../core/services/vacancies.service';
import { CandidatesService } from '../../../core/services/candidates.service';
import { RecruitersService } from '../../../core/services/recruiters.service';
import { VacancyModel } from '../../../core/models/vacancy.model';
import { CandidateModel } from '../../../core/models/candidate.model';
import { RecruiterModel } from '../../../core/models/recruiter.model';

@Component({
  selector: 'app-put-interviews',
  templateUrl: './put-interviews.component.html',
  styleUrl: './put-interviews.component.scss'
})
export class PutInterviewsComponent {
  public vacancies: VacancyModel[] = [];
  public candidates: CandidateModel[] = [];
  public recruiters: RecruiterModel[] = [];
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public interview: InterviewModel, // получение переданных данных
    private readonly vacanciesService: VacanciesService,
    private readonly candidatesService: CandidatesService,
    private readonly recruitersService: RecruitersService,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PutInterviewsComponent>
  ) {
    this.form = this.formBuilder.group({
      vacancy: new FormControl('', Validators.required),
      candidate: new FormControl('', Validators.required),
      recruiter: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });

    this.form.patchValue({ // установка значений из переданных данных в форму
      vacancy: this.interview.vacancy,
      candidate: this.interview.candidate,
      recruiter: this.interview.recruiter,
      date: this.interview.dateTime,
    });
  }

  public ngOnInit(): void {
    this.vacanciesService.get().subscribe((data) => {
      this.vacancies = data;
    });
    this.candidatesService.get().subscribe((data) => {
      this.candidates = data;
    });
    this.recruitersService.get().subscribe((data) => {
      this.recruiters = data;
    });
  }

  public save(): void {
    const updatedInterview: InterviewModel = {
      id: this.interview.id,
      vacancy: this.interview.vacancy,
      candidate: this.form.value.candidate,
      recruiter: this.form.value.recruiter,
      dateTime: this.form.value.date,
    };

    this.dialogRef.close(updatedInterview);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}

