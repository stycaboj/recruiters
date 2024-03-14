import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidateModel } from '../../../core/models/candidate.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-put-candidates',
  templateUrl: './put-candidates.component.html',
  styleUrl: './put-candidates.component.scss'
})
export class PutCandidatesComponent {
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidate: CandidateModel, // получение переданных данных
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PutCandidatesComponent>
  ) {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl('', Validators.required),
    });

    this.form.patchValue({ // установка значений из переданных данных в форму
      firstName: this.candidate.firstName,
      lastName: this.candidate.lastName,
      phone: this.candidate.phone,
      email: this.candidate.email,
      birthday: this.candidate.birthday,
    });
  }

  // TODO skills имитируются

  public save(): void {
    const updatedCandidate: CandidateModel = {
      id: this.candidate.id,
      image: this.candidate.image,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phone: this.form.value.phone,
      email: this.form.value.email,
      birthday: this.form.value.birthday,
      skills: ['HTML', 'CSS', 'JS', 'Angular'],
    };

    this.dialogRef.close(updatedCandidate);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
