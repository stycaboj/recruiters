import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UnavailableRoutingModule } from './unavailable-routing.module';
import { UnavailableComponent } from './unavailable.component';

@NgModule({
  declarations: [UnavailableComponent],
  imports: [
    CommonModule,
    UnavailableRoutingModule,
  ],
  providers: [],
})
export class UnavailableModule {}
