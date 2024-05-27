import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecruiterModel } from '../../../core/models/recruiter.model';
import { numberValidator } from '../../../core/validators/number.validator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-recruiters',
  templateUrl: './dialog-recruiters.component.html',
  styleUrl: './dialog-recruiters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogRecruitersComponent {
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public recruiters$: Observable<Array<RecruiterModel>>,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogRecruitersComponent>
  ) {
    this.form = this.formBuilder.group({
      firstName: new FormControl('Egor', Validators.required),
      lastName: new FormControl('Rakitin', Validators.required),
      phone: new FormControl('+7 (123) 123-12-12', [
        Validators.required,
        numberValidator(),
      ]),
      email: new FormControl('big@baby.tape', [
        Validators.required,
        Validators.email,
      ]),
      birthday: new FormControl('2000-05-01', Validators.required),
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
