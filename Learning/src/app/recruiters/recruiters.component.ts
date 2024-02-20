import { Component } from '@angular/core';
import { RecruitersService } from '../../core/services/recruiters.service';
import { RecruiterModel } from '../../core/models/recruiter.model';


@Component({
  selector: 'app-recruiters',
  templateUrl: './recruiters.component.html',
  styleUrl: './recruiters.component.scss',
})
export class RecruitersComponent {
  public recruiters: RecruiterModel[] = [];

  constructor(private readonly recruitersService: RecruitersService) { }

  ngOnInit() {
    this.recruitersService.get().subscribe((data) => {
      this.recruiters = data;
    });
  }

}