import { Component } from '@angular/core';
import { RecruitersService } from '../../core/services/recruiters.service';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogRecruitersComponent } from './dialog-recruiters/dialog-recruiters.component';
import { PutRecruitersComponent } from './put-recruiters/put-recruiters.component';

@Component({
  selector: 'app-recruiters',
  templateUrl: './recruiters.component.html',
  styleUrl: './recruiters.component.scss',
})
export class RecruitersComponent {
  public recruiters: RecruiterModel[] = [];

  constructor(
    private readonly recruitersService: RecruitersService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.recruitersService.get().subscribe((data) => {
      this.recruiters = data;
    });
  }

  public openRecruitersDialog(): void {
    const dialogRef = this.dialog.open(DialogRecruitersComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addRecruiter(result);
      }
    });
  }

  public openPutDialog(recruiter: RecruiterModel): void {
    const dialogRef = this.dialog.open(PutRecruitersComponent, {
      width: '400px',
      data: recruiter, // передача данных редактируемого элемента в попап
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateRecruiter(result);
      }
    });
  }

  private addRecruiter(newRecruiter: RecruiterModel): void {
    this.recruitersService.post(newRecruiter).subscribe((addedRecruiter) => {
      this.recruiters.push(addedRecruiter);
    });
  }

  public deleteRecruiter(recruiter: RecruiterModel): void {
    this.recruiters = this.recruiters.filter((arr) => arr !== recruiter);
    this.recruitersService.delete(recruiter.id).subscribe();
  }

  private updateRecruiter(updatedRecruiter: RecruiterModel): void {
    const index = this.recruiters.findIndex(
      (r) => r.id === updatedRecruiter.id
    );
    if (index !== -1) {
      this.recruitersService.put(updatedRecruiter).subscribe(() => {
        this.recruiters[index] = updatedRecruiter;
      });
    }
  }
}
