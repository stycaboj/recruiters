import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { RecruiterModel } from '../../../core/models/recruiter.model';
import { numberValidator } from '../../../core/validators/number.validator';

@Component({
  selector: 'app-put-recruiters',
  templateUrl: './put-recruiters.component.html',
  styleUrl: './put-recruiters.component.scss',
})
export class PutRecruitersComponent {
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly recruiter: RecruiterModel, // получение переданных данных
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PutRecruitersComponent>
  ) {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, numberValidator()]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl('', Validators.required),
    });

    this.form.patchValue({
      // установка значений из переданных данных в форму
      firstName: this.recruiter.firstName,
      lastName: this.recruiter.lastName,
      phone: this.recruiter.phone,
      email: this.recruiter.email,
      birthday: this.recruiter.birthday,
    });
  }

  public save(): void {
    const updatedRecruiter: RecruiterModel = {
      id: this.recruiter.id,
      image: this.recruiter.image,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phone: this.form.value.phone,
      email: this.form.value.email,
      birthday: this.form.value.birthday,
    };
    
    this.dialogRef.close(updatedRecruiter);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
