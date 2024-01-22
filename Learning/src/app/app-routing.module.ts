import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: 'recruiters',
    loadChildren: () => import('./recruiters/recruiters.module').then((m) => m.RecruitersModule),
  },
  {
    path: 'candidates',
    loadChildren: () => import('./candidates/candidates.module').then((m) => m.CandidatesModule),
  },
  {
    path: 'interviews',
    loadChildren: () => import('./interviews/interviews.module').then((m) => m.InterviewsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
