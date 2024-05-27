import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SpinnerModule } from "../../core/shared/spinner/spinner.module";
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideToggleModule } from '../../core/shared/slide-toggle/slide-toggle.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [SettingsComponent],
    providers: [],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        MatCardModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        SpinnerModule,
        SlideToggleModule,
        MatButtonModule
    ]
})
export class SettingsModule {}
