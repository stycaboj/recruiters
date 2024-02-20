import { Component, Input } from '@angular/core';
import { CardModel } from '../../models/card.model';
import { RecruiterModel } from '../../models/recruiter.model';
import { CandidateModel } from '../../models/candidate.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) items!: RecruiterModel[] | CandidateModel[];
  @Input() itemNameColor?: string;
}
