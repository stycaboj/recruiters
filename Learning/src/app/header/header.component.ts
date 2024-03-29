import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInHeaderComponent } from './log-in-header/log-in-header.component';
import { AuthService } from '../../core/services/auth.service';
import { UserModel } from '../../core/models/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: UserModel | null = null;
  public destroy$ = new Subject();
  constructor(private readonly authService: AuthService, private readonly dialog: MatDialog) {}

  public ngOnInit(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public logout(): void {
    this.authService.logout();
  }

  public OpenLogInDialog(): void {
    this.dialog.open(LogInHeaderComponent, {
      width: '400px',
    });
  }
}
