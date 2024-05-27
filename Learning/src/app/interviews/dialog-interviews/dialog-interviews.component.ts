import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InterviewModel } from '../../../core/models/interview.model';
import { DataInterviewsModel } from '../../../core/models/data-interviews.model';

@Component({
  selector: 'app-dialog-interviews',
  templateUrl: './dialog-interviews.component.html',
  styleUrl: './dialog-interviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogInterviewsComponent {
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataInterviewsModel,
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
  // TODO: сделать везде генерацию ID
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
