import { Component } from '@angular/core';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { RecruitersService } from '../../core/services/recruiters.service';
import { CandidatesService } from '../../core/services/candidates.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public recruiters: RecruiterModel[] = [];
  public candidates: CandidateModel[] = [];

  constructor(
    private readonly recruitersService: RecruitersService,
    private readonly candidatesService: CandidatesService
  ) {}

  public ngOnInit(): void {
    this.recruitersService.get().subscribe((data) => {
      this.recruiters = data;
    });
    this.candidatesService.get().subscribe((data) => {
      this.candidates = data;
    });
  }
}
