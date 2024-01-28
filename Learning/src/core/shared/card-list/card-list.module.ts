import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardListComponent } from './card-list.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CardListComponent],
  imports: [
    CommonModule,
    MatCardModule
],
  exports: [
    CardListComponent
  ],
  providers: [],
})
export class CardListModule {}
