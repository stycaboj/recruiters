import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { CardListModule } from '../../core/shared/card-list/card-list.module';

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      MatCardModule,
      CardListModule
    ],
    providers: [],
  })
  export class HomeModule { }