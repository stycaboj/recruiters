import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

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
    canActivate: [AuthGuard]
  },
  {
    path: 'recruiters',
    loadChildren: () => import('./recruiters/recruiters.module').then((m) => m.RecruitersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'candidates',
    loadChildren: () => import('./candidates/candidates.module').then((m) => m.CandidatesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'interviews',
    loadChildren: () => import('./interviews/interviews.module').then((m) => m.InterviewsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'unavailable',
    loadChildren: () => import('./unavailable/unavailable.module').then((m) => m.UnavailableModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
