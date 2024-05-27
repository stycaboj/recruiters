import { Injectable } from '@angular/core';
import { PERMISSIONS } from '../constans';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { PermissionsModel } from '../models/permissions.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private permissionsSubject = new BehaviorSubject<PermissionsModel | null>(
    PERMISSIONS
  );
  private readonly permissionsKey = 'permissions';

  constructor(private readonly router: Router) {}

  public save(permissions: PermissionsModel): void {
    this.permissionsSubject.next(permissions);
    localStorage.setItem(this.permissionsKey, JSON.stringify(permissions));
  }

  public load(): any {
    const permissions = localStorage.getItem(this.permissionsKey);
    if (permissions) {
      const permissionsObj = JSON.parse(permissions);
      this.permissionsSubject.next(permissionsObj);
      return JSON.parse(permissions);
    }
  }

  public getPermissions(): Observable<any | null> {
    return this.permissionsSubject.asObservable();
  }

  public hasPermissions(requiredPermissions: string[]): Observable<boolean> {
    const permissions = JSON.parse(localStorage.getItem(this.permissionsKey) || '{}');
    const permissionsSubject = new BehaviorSubject<PermissionsModel | null>(permissions);

    return permissionsSubject.asObservable().pipe(
      map((permissions) => {
        if (!permissions) return false;
        return requiredPermissions.every(
          (permission) => permissions[permission] !== null
        );
      }),
      tap((hasPermission) => {
        if (!hasPermission) {
          this.router.navigate(['/access-denied']);
        }
      })
    );
  }
}
