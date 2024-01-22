import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruitersComponent } from './recruiters.component';

const routes: Routes = [
  { path: '',  component: RecruitersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruitersRoutingModule {}