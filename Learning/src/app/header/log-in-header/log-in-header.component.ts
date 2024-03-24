import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { UserModel } from '../../../core/models/user.model';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-log-in-header',
  templateUrl: './log-in-header.component.html',
  styleUrl: './log-in-header.component.scss',
})
export class LogInHeaderComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public user: UserModel | null = null;
  public users: UserModel[] = [];
  public destroy$ = new Subject();
  public hide = true;
  public invalidLogIn = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<LogInHeaderComponent>,
    private readonly authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      login: new FormControl('stycaboj', Validators.required),
      password: new FormControl('force', Validators.required),
    });
  }

  ngOnInit(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public login(login: string, password: string): void {
    this.authService
      .login(login, password)
      ?.pipe(
        tap((item) => {
          if (item) {
            this.invalidLogIn = false;
            this.dialogRef.close();
            return;
          }
          this.invalidLogIn = true;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.authService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users = users;
      });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
