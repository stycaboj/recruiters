import { Component } from '@angular/core';
import { CandidatesService } from '../../core/services/candidates.service';
import { CandidateModel } from '../../core/models/candidate.model';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent {
  public candidates: CandidateModel[] = [];

  constructor(private readonly candidatesService: CandidatesService) { }

  ngOnInit() {
    this.candidatesService.get().subscribe((data) => {
      this.candidates = data;
    });
  }
}
