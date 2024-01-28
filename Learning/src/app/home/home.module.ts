import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { CardListComponent } from './card-list/card-list.component';

@NgModule({
    declarations: [
        HomeComponent,
        CardListComponent,
    ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      MatCardModule
    ],
    providers: [],
  })
  export class HomeModule { }