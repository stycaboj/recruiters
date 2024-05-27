import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { VacancyModel } from '../../../core/models/vacancy.model';
import { RecruiterModel } from '../../../core/models/recruiter.model';

@Component({
  selector: 'app-list-vacancies',
  templateUrl: './list-vacancies.component.html',
  styleUrl: './list-vacancies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListVacanciesComponent {
  @Input() public vacancies?: Array<VacancyModel> | null;
  @Input() public recruiters?: Array<RecruiterModel> | null;
  @Output() public deletedVacancy = new EventEmitter<VacancyModel>();
  @Output() public updatedVacancy = new EventEmitter<VacancyModel>();

  public getIcon(vacancy: VacancyModel): string {
    return vacancy.title.slice(0, 3).toUpperCase();
  }

  public imageOfRecruiter(recruiterId: number) {
    return this.recruiters?.find((recruiter) => recruiter.id === recruiterId)?.image;
  }

  public deleteVacancy(deletedVacancy: VacancyModel): void {
    this.deletedVacancy.emit(deletedVacancy);
  }

  public updateVacancy(updatedVacancy: VacancyModel): void {
    this.updatedVacancy.emit(updatedVacancy);
  }
}
