import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard implements CanActivate {
  constructor(private readonly settingsService: SettingsService) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredPermissions = route.data['permissions'] as string[];
    return this.settingsService.hasPermissions(requiredPermissions);
  }
}
