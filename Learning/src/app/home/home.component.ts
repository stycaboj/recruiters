import { Component } from '@angular/core';
import { CardModel } from '../../core/models/card.model';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { RecruitersService } from '../../core/services/recruiters.service';
import { CandidatesService } from '../../core/services/candidates.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { RecruitersComponent } from '../recruiters/recruiters.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public recruiters: RecruiterModel[] = [];
  public candidates: CandidateModel[] = [];

  constructor(private readonly recruitersService: RecruitersService, private readonly candidatesService: CandidatesService) { }

  ngOnInit() {
    this.recruitersService.get().subscribe((data) => {
      this.recruiters = data;
    });
    this.candidatesService.get().subscribe((data) => {
      this.candidates = data;
    });
  }
}
