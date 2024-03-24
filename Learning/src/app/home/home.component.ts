import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { RecruitersService } from '../../core/services/recruiters.service';
import { CandidatesService } from '../../core/services/candidates.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { Subject, takeUntil } from 'rxjs';

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
    private readonly candidatesService: CandidatesService
  ) {}

  public ngOnInit(): void {
    this.recruitersService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.recruiters = data;
      });
    this.candidatesService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.candidates = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
