import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { AccessDeniedComponent } from './access-denied.component';

@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    AccessDeniedRoutingModule,
  ],
  providers: [],
})
export class AccessDeniedModule {}
