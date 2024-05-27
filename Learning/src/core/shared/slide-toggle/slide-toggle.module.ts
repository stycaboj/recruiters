import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlideToggleComponent } from './slide-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SlideToggleComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
],
  exports: [
    SlideToggleComponent
  ],
  providers: [],
})
export class SlideToggleModule {}
