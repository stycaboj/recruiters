import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RecruiterModel } from '../../../core/models/recruiter.model';
import { numberValidator } from '../../../core/validators/number.validator';

@Component({
  selector: 'app-dialog-recruiters',
  templateUrl: './dialog-recruiters.component.html',
  styleUrl: './dialog-recruiters.component.scss',
})
export class DialogRecruitersComponent {
  public form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogRecruitersComponent>
  ) {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, numberValidator()]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl('', Validators.required),
    });
  }

  public save(): void {
    const newRecruiter: RecruiterModel = {
      id: 22,
      image: '../../../assets/img/photo.jpg',
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phone: this.form.value.phone,
      email: this.form.value.email,
      birthday: this.form.value.birthday,
    };

    this.dialogRef.close(newRecruiter);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
