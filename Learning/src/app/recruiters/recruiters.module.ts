import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { RecruitersRoutingModule } from './recruiters-routing.module';
import { RecruitersComponent } from './recruiters.component';
import { HttpClientModule } from '@angular/common/http';
import { RecruitersService } from '../../core/services/recruiters.service';

@NgModule({
  declarations: [RecruitersComponent],
  imports: [
    CommonModule,
    RecruitersRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [],
})
export class RecruitersModule {}
