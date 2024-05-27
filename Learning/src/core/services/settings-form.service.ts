import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PermissionsModel } from '../models/permissions.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsFormService {
  constructor(private readonly formBuilder: FormBuilder) {}

  public createForm(permissions: PermissionsModel): FormGroup {
    return this.formBuilder.group({
      vacanciesView: new FormControl(permissions.vacanciesView),
      vacanciesCreate: new FormControl(permissions.vacanciesCreate),
      vacanciesEdit: new FormControl(permissions.vacanciesEdit),
      vacanciesDelete: new FormControl(permissions.vacanciesDelete),
      recruitersView: new FormControl(permissions.recruitersView),
      recruitersCreate: new FormControl(permissions.recruitersCreate),
      recruitersEdit: new FormControl(permissions.recruitersEdit),
      recruitersDelete: new FormControl(permissions.recruitersDelete),
      candidatesView: new FormControl(permissions.candidatesView),
      candidatesCreate: new FormControl(permissions.candidatesCreate),
      candidatesEdit: new FormControl(permissions.candidatesEdit),
      candidatesDelete: new FormControl(permissions.candidatesDelete),
      interviewsView: new FormControl(permissions.interviewsView),
      interviewsCreate: new FormControl(permissions.interviewsCreate),
      interviewsEdit: new FormControl(permissions.interviewsEdit),
      interviewsDelete: new FormControl(permissions.interviewsDelete),
    });
  }

  public setFormValueChanges(form: FormGroup): void {
    form.controls['vacanciesView'].valueChanges.subscribe(() => {
      if (form.controls['vacanciesView'].value === null) {
        form.controls['vacanciesEdit'].setValue(null);
        form.controls['vacanciesDelete'].setValue(null);
      }
    });

    form.controls['vacanciesEdit'].valueChanges.subscribe(() => {
      if (form.controls['vacanciesEdit'].value) {
        form.controls['vacanciesView'].setValue('VACANCIES_VIEW');
      }
    });

    form.controls['vacanciesDelete'].valueChanges.subscribe(() => {
      if (form.controls['vacanciesDelete'].value) {
        form.controls['vacanciesView'].setValue('VACANCIES_VIEW');
      }
    });

    form.controls['recruitersView'].valueChanges.subscribe(() => {
        if (form.controls['recruitersView'].value === null) {
          form.controls['recruitersEdit'].setValue(null);
          form.controls['recruitersDelete'].setValue(null);
        }
      });

    form.controls['recruitersEdit'].valueChanges.subscribe(() => {
      if (form.controls['recruitersEdit'].value) {
        form.controls['recruitersView'].setValue('RECRUITERS_VIEW');
      }
    });

    form.controls['recruitersDelete'].valueChanges.subscribe(() => {
      if (form.controls['recruitersDelete'].value) {
        form.controls['recruitersView'].setValue('RECRUITERS_VIEW');
      }
    });

    form.controls['candidatesView'].valueChanges.subscribe(() => {
        if (form.controls['candidatesView'].value === null) {
          form.controls['candidatesEdit'].setValue(null);
          form.controls['candidatesDelete'].setValue(null);
        }
      });

    form.controls['candidatesEdit'].valueChanges.subscribe(() => {
      if (form.controls['candidatesEdit'].value) {
        form.controls['candidatesView'].setValue('CANDIDATES_VIEW');
      }
    });

    form.controls['candidatesDelete'].valueChanges.subscribe(() => {
      if (form.controls['candidatesDelete'].value) {
        form.controls['candidatesView'].setValue('CANDIDATES_VIEW');
      }
    });

    form.controls['interviewsView'].valueChanges.subscribe(() => {
        if (form.controls['interviewsView'].value === null) {
          form.controls['interviewsEdit'].setValue(null);
          form.controls['interviewsDelete'].setValue(null);
        }
      });

    form.controls['interviewsEdit'].valueChanges.subscribe(() => {
      if (form.controls['interviewsEdit'].value) {
        form.controls['interviewsView'].setValue('INTERVIEWS_VIEW');
      }
    });

    form.controls['interviewsDelete'].valueChanges.subscribe(() => {
      if (form.controls['interviewsDelete'].value) {
        form.controls['interviewsView'].setValue('INTERVIEWS_VIEW');
      }
    });
  }

  public updatePermissionsForm(form: FormGroup, permissions: PermissionsModel): void {
    permissions.vacanciesView = form.value.vacanciesView;
    permissions.vacanciesCreate = form.value.vacanciesCreate;
    permissions.vacanciesEdit = form.value.vacanciesEdit;
    permissions.vacanciesDelete = form.value.vacanciesDelete;
    permissions.candidatesCreate = form.value.candidatesCreate;
    permissions.candidatesDelete = form.value.candidatesDelete;
    permissions.candidatesEdit = form.value.candidatesEdit;
    permissions.candidatesView = form.value.candidatesView;
    permissions.recruitersCreate = form.value.recruitersCreate;
    permissions.recruitersDelete = form.value.recruitersDelete;
    permissions.recruitersEdit = form.value.recruitersEdit;
    permissions.recruitersView = form.value.recruitersView;
    permissions.interviewsCreate = form.value.interviewsCreate;
    permissions.interviewsDelete = form.value.interviewsDelete;
    permissions.interviewsEdit = form.value.interviewsEdit;
    permissions.interviewsView = form.value.interviewsView;
  }
}
