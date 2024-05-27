import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { PermissionsGuard } from '../core/guards/permissions.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' 
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'vacancies',
    loadChildren: () => import('./vacancies/vacancies.module').then((m) => m.VacanciesModule),
    canActivate: [AuthGuard, PermissionsGuard],
    data: { permissions: ['vacanciesView', 'vacanciesCreate'] }
  },
  {
    path: 'recruiters',
    loadChildren: () => import('./recruiters/recruiters.module').then((m) => m.RecruitersModule),
    canActivate: [AuthGuard, PermissionsGuard],
    data: { permissions: ['recruitersView', 'recruitersCreate'] }
  },
  {
    path: 'candidates',
    loadChildren: () => import('./candidates/candidates.module').then((m) => m.CandidatesModule),
    canActivate: [AuthGuard, PermissionsGuard],
    data: { permissions: ['candidatesView', 'candidatesCreate'] }
  },
  {
    path: 'interviews',
    loadChildren: () => import('./interviews/interviews.module').then((m) => m.InterviewsModule),
    canActivate: [AuthGuard, PermissionsGuard],
    data: { permissions: ['interviewsView', 'interviewsCreate'] }
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'unavailable',
    loadChildren: () => import('./unavailable/unavailable.module').then((m) => m.UnavailableModule),
  },
  {
    path: 'access-denied',
    loadChildren: () => import('./access-denied/access-denied.module').then((m) => m.AccessDeniedModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
