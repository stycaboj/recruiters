import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { RecruitersService } from '../../core/services/recruiters.service';
import { CandidatesService } from '../../core/services/candidates.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  public recruiters: RecruiterModel[] = [];
  public candidates: CandidateModel[] = [];
  public destroy$ = new Subject();

  constructor(
    private readonly recruitersService: RecruitersService,
    private readonly candidatesService: CandidatesService,
    private readonly spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    forkJoin([
      this.recruitersService.get().pipe(takeUntil(this.destroy$)),
      this.candidatesService.get().pipe(takeUntil(this.destroy$)),
    ]).subscribe(([recruiters, candidates]) => {
      this.spinner.hide();
      (this.recruiters = recruiters), (this.candidates = candidates);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
