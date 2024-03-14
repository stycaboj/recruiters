import { Component } from '@angular/core';
import { VacanciesService } from '../../../core/services/vacancies.service';
import { CandidatesService } from '../../../core/services/candidates.service';
import { RecruitersService } from '../../../core/services/recruiters.service';
import { VacancyModel } from '../../../core/models/vacancy.model';
import { CandidateModel } from '../../../core/models/candidate.model';
import { RecruiterModel } from '../../../core/models/recruiter.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InterviewModel } from '../../../core/models/interview.model';

@Component({
  selector: 'app-dialog-interviews',
  templateUrl: './dialog-interviews.component.html',
  styleUrl: './dialog-interviews.component.scss'
})
export class DialogInterviewsComponent {
  public vacancies: VacancyModel[] = [];
  public candidates: CandidateModel[] = [];
  public recruiters: RecruiterModel[] = [];
  public form: FormGroup;

  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly candidatesService: CandidatesService,
    private readonly recruitersService: RecruitersService,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogInterviewsComponent>
    ) {
      this.form = this.formBuilder.group({
        vacancy: new FormControl('', Validators.required),
        candidate: new FormControl('', Validators.required),
        recruiter: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
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
    const newInterview: InterviewModel = {
      id: 22,
      vacancy: this.form.value.vacancy,
      candidate: this.form.value.candidate,
      recruiter: this.form.value.recruiter,
      dateTime: this.form.value.date,
    };

    this.dialogRef.close(newInterview);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
