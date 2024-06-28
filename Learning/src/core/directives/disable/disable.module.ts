import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDirective } from './disable.directive';

@NgModule({
  declarations: [PermissionDirective],
  imports: [CommonModule],
  exports: [PermissionDirective]
})
export class PermissionModule {}