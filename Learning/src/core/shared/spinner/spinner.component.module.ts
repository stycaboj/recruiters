import { CommonModule } from "@angular/common";
import { SpinnerComponent } from "./spinner.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [SpinnerComponent],
    imports: [
      CommonModule,
      NgxSpinnerModule
  ],
    exports: [
    SpinnerComponent
    ],
    providers: [],
  })
  export class SpinnerModule {}